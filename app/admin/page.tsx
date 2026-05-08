'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  ShoppingBag, Package, Users, HelpCircle, Settings,
  Plus, Pencil, Trash2, X, Check, Download, Upload,
  Eye, EyeOff, LogOut, ChevronDown, ChevronUp,
  Star, ToggleLeft, ToggleRight, RefreshCw, Database,
} from 'lucide-react'
import {
  getProducts, createProduct, updateProduct, deleteProduct,
  getCategories, createCategory, updateCategory, deleteCategory,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getFaqs, createFaq, updateFaq, deleteFaq,
  seedDatabase,
} from '@/lib/db'
import type { Product, Category, Testimonial, FAQ } from '@/types'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

type Tab = 'products' | 'categories' | 'testimonials' | 'faqs' | 'data'

interface StoreData {
  products: Product[]
  categories: Category[]
  testimonials: Testimonial[]
  faqs: FAQ[]
}

// ── Shared UI ────────────────────────────────────────────

function Input({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      <input {...p} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
    </div>
  )
}

function Textarea({ label, ...p }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      <textarea {...p} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white resize-none" />
    </div>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-4 h-4 text-gray-500" /></button>
        </div>
        <div className="overflow-y-auto p-5 space-y-4">{children}</div>
      </div>
    </div>
  )
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t) }, [onDone])
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap">
      <Check className="w-4 h-4 text-green-400" />{message}
    </div>
  )
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <RefreshCw className="w-6 h-6 text-gray-300 animate-spin" />
    </div>
  )
}

// ── Products tab ─────────────────────────────────────────

function emptyProduct(): Omit<Product, 'id'> {
  return { name: '', description: '', price: 0, images: [''], category: '', featured: false, inStock: true, rating: 5, badge: '', specs: [] }
}

function ProductsTab({ products, onRefresh, toast }: { products: Product[]; onRefresh: () => void; toast: (m: string) => void }) {
  const [modal, setModal] = useState<null | 'add' | Product>(null)
  const [form, setForm] = useState(emptyProduct())
  const [specsInput, setSpecsInput] = useState('')
  const [imagesInput, setImagesInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const openAdd = () => { setForm(emptyProduct()); setSpecsInput(''); setImagesInput(''); setModal('add') }
  const openEdit = (p: Product) => { setForm({ ...p }); setSpecsInput((p.specs ?? []).join(', ')); setImagesInput(p.images.join('\n')); setModal(p) }

  const save = async () => {
    setSaving(true)
    const images = imagesInput.split('\n').map(s => s.trim()).filter(Boolean)
    const specs = specsInput.split(',').map(s => s.trim()).filter(Boolean)
    const data = { ...form, images: images.length ? images : [''], specs }
    if (modal === 'add') {
      await createProduct(data); toast('Product added')
    } else {
      await updateProduct((modal as Product).id, data); toast('Product updated')
    }
    setSaving(false); setModal(null); onRefresh()
  }

  const del = async (id: string) => {
    await deleteProduct(id); setConfirmDelete(null); toast('Product deleted'); onRefresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{products.length} product{products.length !== 1 ? 's' : ''}</p>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {p.images[0] && <Image src={p.images[0]} alt={p.name} fill className="object-cover" unoptimized />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{p.name}</p>
              <p className="text-xs text-gray-400">₦{p.price.toLocaleString()} · {p.category}</p>
              <div className="flex gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                  {p.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {p.featured && <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-600">Featured</span>}
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={async () => { await updateProduct(p.id, { inStock: !p.inStock }); onRefresh() }} className="p-2 rounded-lg hover:bg-gray-50" title="Toggle stock">
                {p.inStock ? <ToggleRight className="w-4 h-4 text-green-500" /> : <ToggleLeft className="w-4 h-4 text-gray-400" />}
              </button>
              <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-blue-50"><Pencil className="w-4 h-4 text-blue-500" /></button>
              <button onClick={() => setConfirmDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <Modal title={modal === 'add' ? 'Add Product' : 'Edit Product'} onClose={() => setModal(null)}>
          <Input label="Product Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Textarea label="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Price (₦)" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} />
            <Input label="Badge (optional)" value={form.badge ?? ''} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="New, Hot, Sale…" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Category ID" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            <Input label="Rating (1–5)" type="number" min={1} max={5} step={0.1} value={form.rating ?? ''} onChange={e => setForm(f => ({ ...f, rating: +e.target.value }))} />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input type="checkbox" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))} />
              In Stock
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
              Featured
            </label>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Image URLs (one per line)</label>
            <textarea value={imagesInput} onChange={e => setImagesInput(e.target.value)} rows={3}
              placeholder="https://images.unsplash.com/..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white resize-none" />
            {imagesInput.split('\n')[0]?.trim() && (
              <div className="relative h-24 mt-2 rounded-lg overflow-hidden bg-gray-100">
                <Image src={imagesInput.split('\n')[0].trim()} alt="preview" fill className="object-cover" unoptimized />
              </div>
            )}
          </div>
          <Input label="Specs (comma-separated)" value={specsInput} onChange={e => setSpecsInput(e.target.value)} placeholder="Feature 1, Feature 2…" />
          <button onClick={save} disabled={saving} className="w-full bg-green-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
            {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
            {modal === 'add' ? 'Add Product' : 'Save Changes'}
          </button>
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Delete Product?" onClose={() => setConfirmDelete(null)}>
          <p className="text-sm text-gray-500">This will be permanently deleted from Supabase.</p>
          <div className="flex gap-3">
            <button onClick={() => del(confirmDelete)} className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-xl hover:bg-red-600">Delete</button>
            <button onClick={() => setConfirmDelete(null)} className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Categories tab ────────────────────────────────────────

function CategoriesTab({ categories, onRefresh, toast }: { categories: Category[]; onRefresh: () => void; toast: (m: string) => void }) {
  const [modal, setModal] = useState<null | 'add' | Category>(null)
  const [form, setForm] = useState<Omit<Category, 'id'>>({ name: '', description: '', image: '', productCount: 0, icon: '📦' })
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    if (modal === 'add') {
      await createCategory({ ...form, id: form.name.toLowerCase().replace(/\s+/g, '-') }); toast('Category added')
    } else {
      await updateCategory((modal as Category).id, form); toast('Category updated')
    }
    setSaving(false); setModal(null); onRefresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{categories.length} categories</p>
        <button onClick={() => { setForm({ name: '', description: '', image: '', productCount: 0, icon: '📦' }); setModal('add') }}
          className="flex items-center gap-1.5 bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>
      <div className="space-y-3">
        {categories.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center text-xl">
              {c.image ? <Image src={c.image} alt={c.name} fill className="object-cover" unoptimized /> : c.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{c.icon} {c.name}</p>
              <p className="text-xs text-gray-400">{c.productCount} items · id: {c.id}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setForm({ ...c }); setModal(c) }} className="p-2 rounded-lg hover:bg-blue-50"><Pencil className="w-4 h-4 text-blue-500" /></button>
              <button onClick={async () => { await deleteCategory(c.id); toast('Category deleted'); onRefresh() }} className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <Modal title={modal === 'add' ? 'Add Category' : 'Edit Category'} onClose={() => setModal(null)}>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input label="Icon (emoji)" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} />
          </div>
          <Input label="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <Input label="Image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." />
          {form.image && <div className="relative h-24 rounded-lg overflow-hidden bg-gray-100"><Image src={form.image} alt="preview" fill className="object-cover" unoptimized /></div>}
          <Input label="Product Count (display)" type="number" value={form.productCount} onChange={e => setForm(f => ({ ...f, productCount: +e.target.value }))} />
          <button onClick={save} disabled={saving} className="w-full bg-green-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl hover:bg-green-600 flex items-center justify-center gap-2">
            {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
            {modal === 'add' ? 'Add Category' : 'Save Changes'}
          </button>
        </Modal>
      )}
    </div>
  )
}

// ── Testimonials tab ──────────────────────────────────────

function TestimonialsTab({ testimonials, onRefresh, toast }: { testimonials: Testimonial[]; onRefresh: () => void; toast: (m: string) => void }) {
  const [modal, setModal] = useState<null | 'add' | Testimonial>(null)
  const [form, setForm] = useState<Omit<Testimonial, 'id'>>({ name: '', location: '', message: '', rating: 5, date: 'Recently' })
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    if (modal === 'add') { await createTestimonial(form); toast('Review added') }
    else { await updateTestimonial((modal as Testimonial).id, form); toast('Review updated') }
    setSaving(false); setModal(null); onRefresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{testimonials.length} reviews</p>
        <button onClick={() => { setForm({ name: '', location: '', message: '', rating: 5, date: 'Recently' }); setModal('add') }}
          className="flex items-center gap-1.5 bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>
      <div className="space-y-3">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.location} · {t.date}</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />)}
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => { setForm({ ...t }); setModal(t) }} className="p-2 rounded-lg hover:bg-blue-50"><Pencil className="w-4 h-4 text-blue-500" /></button>
                <button onClick={async () => { await deleteTestimonial(t.id); toast('Review deleted'); onRefresh() }} className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 italic line-clamp-2">"{t.message}"</p>
          </div>
        ))}
      </div>

      {modal !== null && (
        <Modal title={modal === 'add' ? 'Add Review' : 'Edit Review'} onClose={() => setModal(null)}>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input label="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Lagos, Nigeria" />
          </div>
          <Textarea label="Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Rating (1–5)" type="number" min={1} max={5} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: +e.target.value }))} />
            <Input label="Date Display" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="2 weeks ago" />
          </div>
          <button onClick={save} disabled={saving} className="w-full bg-green-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl hover:bg-green-600 flex items-center justify-center gap-2">
            {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
            {modal === 'add' ? 'Add Review' : 'Save Changes'}
          </button>
        </Modal>
      )}
    </div>
  )
}

// ── FAQs tab ──────────────────────────────────────────────

function FaqsTab({ faqs, onRefresh, toast }: { faqs: FAQ[]; onRefresh: () => void; toast: (m: string) => void }) {
  const [modal, setModal] = useState<null | 'add' | FAQ>(null)
  const [form, setForm] = useState<Omit<FAQ, 'id'>>({ question: '', answer: '' })
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const save = async () => {
    setSaving(true)
    if (modal === 'add') { await createFaq(form); toast('FAQ added') }
    else { await updateFaq((modal as FAQ).id, form); toast('FAQ updated') }
    setSaving(false); setModal(null); onRefresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{faqs.length} FAQs</p>
        <button onClick={() => { setForm({ question: '', answer: '' }); setModal('add') }}
          className="flex items-center gap-1.5 bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>
      <div className="space-y-2">
        {faqs.map(f => (
          <div key={f.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 p-3">
              <button onClick={() => setExpanded(expanded === f.id ? null : f.id)} className="flex-1 text-left text-sm font-semibold text-gray-900 flex items-center gap-2">
                {expanded === f.id ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                <span className="line-clamp-1">{f.question}</span>
              </button>
              <button onClick={() => { setForm({ ...f }); setModal(f) }} className="p-1.5 rounded-lg hover:bg-blue-50 flex-shrink-0"><Pencil className="w-3.5 h-3.5 text-blue-500" /></button>
              <button onClick={async () => { await deleteFaq(f.id); toast('FAQ deleted'); onRefresh() }} className="p-1.5 rounded-lg hover:bg-red-50 flex-shrink-0"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
            </div>
            {expanded === f.id && <div className="px-4 pb-3 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-2">{f.answer}</div>}
          </div>
        ))}
      </div>

      {modal !== null && (
        <Modal title={modal === 'add' ? 'Add FAQ' : 'Edit FAQ'} onClose={() => setModal(null)}>
          <Input label="Question" value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} />
          <Textarea label="Answer" value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} rows={4} />
          <button onClick={save} disabled={saving} className="w-full bg-green-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl hover:bg-green-600 flex items-center justify-center gap-2">
            {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
            {modal === 'add' ? 'Add FAQ' : 'Save Changes'}
          </button>
        </Modal>
      )}
    </div>
  )
}

// ── Data tab ──────────────────────────────────────────────

function DataTab({ data, onRefresh, toast }: { data: StoreData; onRefresh: () => void; toast: (m: string) => void }) {
  const [seeding, setSeeding] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `store-backup-${Date.now()}.json`
    a.click()
    toast('Backup downloaded')
  }

  const seed = async () => {
    if (!confirm('This will upsert all sample data into Supabase. Continue?')) return
    setSeeding(true)
    await seedDatabase()
    setSeeding(false)
    onRefresh()
    toast('Sample data seeded!')
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h4 className="font-semibold text-gray-900 mb-1">Supabase Stats</h4>
        <p className="text-sm text-gray-400 mb-4">Live data from your database.</p>
        <div className="grid grid-cols-2 gap-3">
          {([['Products', data.products.length], ['Categories', data.categories.length], ['Reviews', data.testimonials.length], ['FAQs', data.faqs.length]] as [string, number][]).map(([k, v]) => (
            <div key={k} className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{v}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h4 className="font-semibold text-gray-900 mb-1">Seed Sample Data</h4>
        <p className="text-sm text-gray-400 mb-4">First time? Populate Supabase with the sample products from <code className="bg-gray-100 px-1 rounded">data/index.ts</code>.</p>
        <button onClick={seed} disabled={seeding} className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60">
          {seeding ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
          {seeding ? 'Seeding…' : 'Seed Sample Data into Supabase'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h4 className="font-semibold text-gray-900 mb-1">Backup</h4>
        <p className="text-sm text-gray-400 mb-4">Export your current Supabase data as a JSON backup.</p>
        <button onClick={exportData} className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">
          <Download className="w-4 h-4" /> Download JSON Backup
        </button>
        <input ref={fileRef} type="file" accept=".json" className="hidden" />
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [pwError, setPwError] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('products')
  const [data, setData] = useState<StoreData>({ products: [], categories: [], testimonials: [], faqs: [] })
  const [loading, setLoading] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') setIsLoggedIn(true)
  }, [])

  const refreshAll = useCallback(async () => {
    setLoading(true)
    const [products, categories, testimonials, faqs] = await Promise.all([
      getProducts(), getCategories(), getTestimonials(), getFaqs(),
    ])
    setData({ products, categories, testimonials, faqs })
    setLoading(false)
  }, [])

  useEffect(() => { if (isLoggedIn) refreshAll() }, [isLoggedIn, refreshAll])

  const login = () => {
    if (password === ADMIN_PASSWORD) { sessionStorage.setItem('admin_auth', 'true'); setIsLoggedIn(true); setPwError('') }
    else setPwError('Incorrect password')
  }

  const logout = () => { sessionStorage.removeItem('admin_auth'); setIsLoggedIn(false); setPassword('') }
  const toast = (msg: string) => setToastMsg(msg)

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'products',     label: 'Products',   icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'categories',   label: 'Categories', icon: <Package className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Reviews',    icon: <Users className="w-4 h-4" /> },
    { id: 'faqs',         label: 'FAQs',       icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'data',         label: 'Data',       icon: <Settings className="w-4 h-4" /> },
  ]

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Store Admin</h1>
            <p className="text-gray-400 text-sm mt-1">Powered by Supabase</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && login()}
                  placeholder="Enter admin password"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pwError && <p className="text-red-500 text-xs mt-1">{pwError}</p>}
            </div>
            <button onClick={login} className="w-full bg-green-500 text-white font-semibold py-2.5 rounded-xl hover:bg-green-600 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">Admin Panel</span>
          <span className="text-xs text-gray-400 hidden sm:block">· Supabase</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refreshAll} disabled={loading} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Refresh data">
            <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <a href="/" target="_blank" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> View Store
          </a>
          <button onClick={logout} className="p-2 rounded-lg hover:bg-gray-100" title="Sign out">
            <LogOut className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 overflow-x-auto">
        <div className="flex px-4 min-w-max">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === t.id ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? <Spinner /> : (
          <>
            {activeTab === 'products'     && <ProductsTab     products={data.products}         onRefresh={refreshAll} toast={toast} />}
            {activeTab === 'categories'   && <CategoriesTab   categories={data.categories}     onRefresh={refreshAll} toast={toast} />}
            {activeTab === 'testimonials' && <TestimonialsTab testimonials={data.testimonials} onRefresh={refreshAll} toast={toast} />}
            {activeTab === 'faqs'         && <FaqsTab         faqs={data.faqs}                 onRefresh={refreshAll} toast={toast} />}
            {activeTab === 'data'         && <DataTab         data={data}                      onRefresh={refreshAll} toast={toast} />}
          </>
        )}
      </div>

      {toastMsg && <Toast message={toastMsg} onDone={() => setToastMsg('')} />}
    </div>
  )
}
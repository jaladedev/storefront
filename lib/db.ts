import { supabase } from './supabase'
import type { Product, Category, Testimonial, FAQ } from '@/types'

// ── Mappers ───────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mp = (r: any): Product => ({
  id: r.id, name: r.name, description: r.description ?? '',
  price: r.price, images: r.images ?? [], category: r.category ?? '',
  featured: r.featured ?? false, inStock: r.in_stock ?? true,
  rating: r.rating, badge: r.badge ?? '', specs: r.specs ?? [],
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mc = (r: any): Category => ({
  id: r.id, name: r.name, description: r.description ?? '',
  image: r.image ?? '', productCount: r.product_count ?? 0, icon: r.icon ?? '📦',
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mt = (r: any): Testimonial => ({
  id: r.id, name: r.name, location: r.location ?? '',
  message: r.message ?? '', rating: r.rating ?? 5, date: r.date ?? 'Recently',
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mf = (r: any): FAQ => ({ id: r.id, question: r.question, answer: r.answer ?? '' })

// ── Products ──────────────────────────────────────────────

export async function getProducts() {
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
  return (data ?? []).map(mp)
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data } = await supabase.from('products').select('*').eq('id', id).single()
  return data ? mp(data) : null
}

export async function createProduct(p: Omit<Product, 'id'>): Promise<Product | null> {
  const { data } = await supabase.from('products').insert({
    name: p.name, description: p.description, price: p.price, images: p.images,
    category: p.category, featured: p.featured, in_stock: p.inStock,
    rating: p.rating, badge: p.badge, specs: p.specs,
  }).select().single()
  return data ? mp(data) : null
}

export async function updateProduct(id: string, u: Partial<Product>) {
  const d: Record<string, unknown> = {}
  if (u.name        !== undefined) d.name        = u.name
  if (u.description !== undefined) d.description = u.description
  if (u.price       !== undefined) d.price       = u.price
  if (u.images      !== undefined) d.images      = u.images
  if (u.category    !== undefined) d.category    = u.category
  if (u.featured    !== undefined) d.featured    = u.featured
  if (u.inStock     !== undefined) d.in_stock    = u.inStock
  if (u.rating      !== undefined) d.rating      = u.rating
  if (u.badge       !== undefined) d.badge       = u.badge
  if (u.specs       !== undefined) d.specs       = u.specs
  const { error } = await supabase.from('products').update(d).eq('id', id)
  return !error
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  return !error
}

// ── Categories ────────────────────────────────────────────

export async function getCategories() {
  const { data } = await supabase.from('categories').select('*').order('sort_order')
  return (data ?? []).map(mc)
}

export async function createCategory(c: Category) {
  const { data } = await supabase.from('categories').insert({
    id: c.id, name: c.name, description: c.description,
    image: c.image, product_count: c.productCount, icon: c.icon,
  }).select().single()
  return data ? mc(data) : null
}

export async function updateCategory(id: string, u: Partial<Category>) {
  const d: Record<string, unknown> = {}
  if (u.name         !== undefined) d.name          = u.name
  if (u.description  !== undefined) d.description   = u.description
  if (u.image        !== undefined) d.image         = u.image
  if (u.productCount !== undefined) d.product_count = u.productCount
  if (u.icon         !== undefined) d.icon          = u.icon
  const { error } = await supabase.from('categories').update(d).eq('id', id)
  return !error
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  return !error
}

// ── Testimonials ──────────────────────────────────────────

export async function getTestimonials() {
  const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  return (data ?? []).map(mt)
}

export async function createTestimonial(t: Omit<Testimonial, 'id'>) {
  const { data } = await supabase.from('testimonials')
    .insert({ name: t.name, location: t.location, message: t.message, rating: t.rating, date: t.date })
    .select().single()
  return data ? mt(data) : null
}

export async function updateTestimonial(id: string, u: Partial<Testimonial>) {
  const { error } = await supabase.from('testimonials').update(u).eq('id', id)
  return !error
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  return !error
}

// ── FAQs ──────────────────────────────────────────────────

export async function getFaqs() {
  const { data } = await supabase.from('faqs').select('*').order('sort_order')
  return (data ?? []).map(mf)
}

export async function createFaq(f: Omit<FAQ, 'id'>) {
  const { data } = await supabase.from('faqs')
    .insert({ question: f.question, answer: f.answer })
    .select().single()
  return data ? mf(data) : null
}

export async function updateFaq(id: string, u: Partial<FAQ>) {
  const { error } = await supabase.from('faqs').update(u).eq('id', id)
  return !error
}

export async function deleteFaq(id: string) {
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  return !error
}

// ── Seed (run once from admin) ────────────────────────────

export async function seedDatabase() {
  const { products, categories, testimonials, faqs } = await import('@/data')
  await Promise.all([
    supabase.from('products').upsert(products.map(p => ({
      id: p.id, name: p.name, description: p.description, price: p.price,
      images: p.images, category: p.category, featured: p.featured,
      in_stock: p.inStock, rating: p.rating, badge: p.badge ?? '', specs: p.specs ?? [],
    }))),
    supabase.from('categories').upsert(categories.map((c, i) => ({
      id: c.id, name: c.name, description: c.description, image: c.image,
      product_count: c.productCount, icon: c.icon, sort_order: i,
    }))),
    supabase.from('testimonials').upsert(testimonials.map(t => ({
      id: t.id, name: t.name, location: t.location, message: t.message,
      rating: t.rating, date: t.date,
    }))),
    supabase.from('faqs').upsert(faqs.map((f, i) => ({
      id: f.id, question: f.question, answer: f.answer, sort_order: i,
    }))),
  ])
}
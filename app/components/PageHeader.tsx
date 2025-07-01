export default function PageHeader({ title }: { title: string }) {
  return (
    <h1 className="text-3xl font-bold text-orange-200 mb-6">{title}</h1>
  )
}

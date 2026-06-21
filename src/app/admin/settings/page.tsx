export default function AdminSettings() {
  return (
    <div>
      <h1 className="font-serif text-4xl text-gold mb-8">Settings</h1>

      <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
        <h2 className="font-serif text-xl text-gold mb-4">Store Configuration</h2>
        <p className="text-cream-dark mb-6">
          Configure your store settings, tax rates, and shipping options.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-forest-midnight border border-gold/20 rounded-lg">
            <h3 className="text-gold font-semibold mb-2">Store Information</h3>
            <p className="text-cream-dark text-sm">Manage store name, description, and contact details</p>
          </div>

          <div className="p-4 bg-forest-midnight border border-gold/20 rounded-lg">
            <h3 className="text-gold font-semibold mb-2">Tax Configuration</h3>
            <p className="text-cream-dark text-sm">Set up tax rates by region</p>
          </div>

          <div className="p-4 bg-forest-midnight border border-gold/20 rounded-lg">
            <h3 className="text-gold font-semibold mb-2">Shipping Settings</h3>
            <p className="text-cream-dark text-sm">Configure shipping methods and rates</p>
          </div>

          <div className="p-4 bg-forest-midnight border border-gold/20 rounded-lg">
            <h3 className="text-gold font-semibold mb-2">Payment Configuration</h3>
            <p className="text-cream-dark text-sm">Set up payment gateways and processing</p>
          </div>
        </div>
      </div>
    </div>
  )
}

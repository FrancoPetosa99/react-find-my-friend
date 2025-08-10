export const breedsByType = {
  perro: [
    'Labrador Retriever',
    'Golden Retriever',
    'Pastor Alemán',
    'Bulldog',
    'Beagle',
    'Poodle',
    'Rottweiler',
    'Yorkshire Terrier',
    'Boxer',
    'Dachshund'
  ],
  gato: [
    'Persa',
    'Siamés',
    'Maine Coon',
    'Ragdoll',
    'British Shorthair',
    'Abyssinian',
    'Russian Blue',
    'Sphynx',
    'Bengal',
    'Munchkin'
  ],
  otro: [
    'Conejo',
    'Hamster',
    'Cobayo',
    'Hurón',
    'Pájaro',
    'Tortuga',
    'Pez'
  ]
};

export const cities = [
  'Buenos Aires',
  'Córdoba',
  'Rosario',
  'Mendoza',
  'La Plata',
  'San Miguel de Tucumán',
  'Mar del Plata',
  'Salta',
  'Santa Fe',
  'San Juan'
];

export const provinces = [
  'Buenos Aires',
  'Córdoba',
  'Santa Fe',
  'Mendoza',
  'Tucumán',
  'Salta',
  'Entre Ríos',
  'Chaco',
  'Corrientes',
  'Santiago del Estero'
];

export const provincesAndCities: Record<string, string[]> = {
  'Buenos Aires': ['La Plata', 'Mar del Plata', 'Bahía Blanca', 'Tandil', 'Necochea'],
  'Córdoba': ['Córdoba', 'Río Cuarto', 'Villa María', 'San Francisco', 'Villa Carlos Paz'],
  'Santa Fe': ['Rosario', 'Santa Fe', 'Rafaela', 'Reconquista', 'Venado Tuerto'],
  'Mendoza': ['Mendoza', 'San Rafael', 'San Martín', 'Tunuyán', 'Maipú'],
  'Tucumán': ['San Miguel de Tucumán', 'Yerba Buena', 'Tafí Viejo', 'Aguilares', 'Banda del Río Salí'],
  'Salta': ['Salta', 'San Ramón de la Nueva Orán', 'Tartagal', 'Metán', 'Cafayate'],
  'Entre Ríos': ['Paraná', 'Concordia', 'Gualeguaychú', 'Gualeguay', 'Concepción del Uruguay'],
  'Chaco': ['Resistencia', 'Sáenz Peña', 'Villa Ángela', 'Charata', 'Presidencia Roque Sáenz Peña'],
  'Corrientes': ['Corrientes', 'Goya', 'Paso de los Libres', 'Curuzú Cuatiá', 'Mercedes'],
  'Santiago del Estero': ['Santiago del Estero', 'La Banda', 'Termas de Río Hondo', 'Añatuya', 'Quimilí']
}; 
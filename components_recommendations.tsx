import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type RecommendationsProps = {
  currentService: string;
};

export default function Recommendations({ currentService }: RecommendationsProps = { currentService: '' }) {
  const [recommendations, setRecommendations] = useState<Service[]>([]);

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchRecommendations = async () => {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const allServices: Service[] = [
        { id: 'funebre-basico', name: 'Servicio Fúnebre Básico', description: 'Servicio fúnebre esencial y respetuoso', price: 2500 },
        { id: 'urna-clasica', name: 'Urna Clásica de Madera', description: 'Urna elegante de madera de roble', price: 200 },
        { id: 'corona-clasica', name: 'Corona Clásica', description: 'Arreglo floral tradicional para funerales', price: 200 },
        { id: 'traslado-local', name: 'Traslado Local', description: 'Servicio de traslado dentro de la ciudad', price: 300 },
        { id: 'aviso-local', name: 'Aviso en Periódico Local', description: 'Publicación de esquela en periódico local', price: 150 },
      ];

      // Filter out the current service and select up to 3 random services
      const filteredServices = allServices.filter(service => service.id !== currentService);
      const shuffled = filteredServices.sort(() => 0.5 - Math.random());
      setRecommendations(shuffled.slice(0, 3));
    };

    fetchRecommendations();
  }, [currentService]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Servicios Recomendados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>${service.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{service.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => alert(`Agregado al carrito: ${service.name}`)}>
                Agregar al carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
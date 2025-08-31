import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Clock, Star, MapPin, Waves, Coffee, Music, Sun, Shield, Anchor, Zap, Box, Monitor, Smartphone, Droplets, Sparkles, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import VesselImageCarousel from "@/components/VesselImageCarousel";

// Importar as imagens das embarcações
import segueImage from "@/assets/segue-yacht.jpg";
import tecnomarineImage from "@/assets/tecnomarine-yacht.jpg";
import mywayImage from "@/assets/myway-yacht.jpg";
import flyhiImage from "@/assets/flyhi-boat.jpg";
import mcellImage from "@/assets/mcell-boat.jpg";
import comendadorImage from "@/assets/comendador-yacht.jpg";
import dragaoImage from "@/assets/dragao-yacht.jpg";
import grandrarayImage from "@/assets/grandraray-yacht.jpg";
import ladyRuthImage from "@/assets/lady-ruth-yacht.jpg";
import mangataImage from "@/assets/mangata-yacht.jpg";
import prestigeImage from "@/assets/prestige-yacht.jpg";
import rebecaImage from "@/assets/rebeca-yacht.jpg";
import oceanoImage from "@/assets/oceano-catamaran.jpg";
import blauImage from "@/assets/blau-catamaran.jpg";
import nossaImage from "@/assets/nossa-yacht.jpg";
import sevenImage from "@/assets/seven-yacht.jpg";
import sennaImage from "@/assets/senna-yacht.jpg";
import luisaImage from "@/assets/luisa-yacht.jpg";

// Dados das embarcações
const vesselsData = {
  segue: {
    id: "segue",
    name: "SEGUE",
    type: "Lancha",
    images: [
      "/lovable-uploads/e52f0edd-5490-4210-9f1a-35b63fc3cf97.png",
      "/lovable-uploads/dfe6175f-7118-4636-a1b0-a4ddc3109dc1.png",
      "/lovable-uploads/fe41a6fd-0783-417f-b167-506aea17952e.png",
      "/lovable-uploads/1c084d08-90e7-465f-a60d-01bc9b8e2c50.png",
      "/lovable-uploads/aff73c70-ac4e-4f33-a275-7199028d5abe.png",
      "/lovable-uploads/915d6ac3-d213-42f2-a532-21999a73e18b.png",
      "/lovable-uploads/1a51455d-0fb7-450a-9aa2-8f47c4fbe235.png",
      "/lovable-uploads/bdf8c013-2441-43f9-beaf-26ec4c1c805d.png",
      "/lovable-uploads/05b3916b-9a80-45a7-9cc2-acf139866904.png",
      "/lovable-uploads/b945f968-c86e-4010-9c3c-6454c94a319d.png"
    ],
    capacity: 18,
    price: "R$ 18.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Lancha Segue 58 Pés - Motores: 2 x Volvo 950 IPS. 3 quartos (1 suíte, 1 cabine de solteiro/casal, 1 cabine de proa com banheiro social). Cozinha completa com geladeiras, sala espaçosa, som Bluetooth e churrasqueira a carvão. Destinos: Enseada da Urca ou Praia de Adão e Eva.",
    category: "lancha"
  },
  tecnomarine: {
    id: "tecnomarine",
    name: "TECNOMARINE",
    type: "Iate 52 pés",
    images: [
      "/lovable-uploads/92b2d24f-28f3-4cdb-be14-99cf7cd729da.png",
      "/lovable-uploads/4697521e-1dee-4702-bbe1-67079bb5f843.png",
      "/lovable-uploads/af99f0bb-1b98-48c8-b827-d0bc93ba7759.png",
      "/lovable-uploads/463d7eeb-42ce-415c-b7ff-80724d026b46.png",
      "/lovable-uploads/b0f38995-9c1b-4570-951d-57023d3d1199.png",
      "/lovable-uploads/95ba7d4a-ca33-4738-a613-7148b3d1b867.png",
      "/lovable-uploads/96e4b997-89be-4c5d-985b-ccd8c69440cc.png",
      "/lovable-uploads/6ba680e5-fcc8-4a6b-b81e-78a8c7589659.png",
      "/lovable-uploads/31a54bf8-6201-4349-b69a-9b289882ff99.png"
    ],
    capacity: 20,
    price: "R$ 10.000",
    rating: 4.9,
    duration: "5h",
    location: "Marina da Glória",
    description: "Iate Tecnomarine 52 pés com capacidade para 20 passageiros.",
    
    // Especificações Técnicas
    specs: {
      type: "Iate 52 pés",
      capacity: "20 passageiros",
      duration: "5 horas",
      departure: "Marina da Glória - RJ"
    },

    // Inclusos no Passeio
    amenities: [
      "Combustível incluído",
      "Marinheiro profissional",
      "5 horas de passeio",
      "Embarque na Marina da Glória"
    ],

    // Preços por Roteiro
    destinations: [
      { name: "Roteiro Urca", price: "R$ 10.000,00" },
      { name: "Roteiro Praia Vermelha", price: "R$ 11.000,00" },
      { name: "Copacabana", price: "R$ 13.800,00" },
      { name: "Cagarras", price: "R$ 15.000,00" }
    ],

    // Taxas Adicionais
    additionalFees: [
      { service: "Taxa do Churrasqueiro", price: "R$ 200,00" },
      { service: "Taxa de Embarque", price: "R$ 200,00" }
    ],

    category: "iate"
  },
  myway: {
    id: "myway",
    name: "IATE MY WAY",
    type: "Iate 60 pés",
    images: [
      "/lovable-uploads/3588f07b-7df8-4af6-829b-24ecd40b669e.png",
      "/lovable-uploads/78c323b5-e854-4a7c-ad9c-66b0477d604b.png",
      "/lovable-uploads/9eddcf09-1dc0-44ce-8335-a8c03e574409.png",
      "/lovable-uploads/221aa19e-adc7-47e6-a105-6d253b1b47fa.png",
      "/lovable-uploads/be0928b3-3995-4daf-a4c0-9e51b1c70487.png",
      "/lovable-uploads/df620d3e-513f-4487-adc4-4b90ca2dc0c3.png",
      "/lovable-uploads/6f10c3d7-fdd1-4a6b-aff5-c747bab05438.png",
      "/lovable-uploads/9dd84655-7e04-4441-9eab-f45a778e5d9c.png",
      "/lovable-uploads/e02bd15f-6c03-4c32-85fc-5de1a208a6e3.png"
    ],
    capacity: 20,
    price: "R$ 12.000",
    rating: 4.9,
    duration: "5h",
    location: "Marina da Glória",
    description: "Iate my way - Uma experiência de luxo incomparável na Baía de Guanabara.",
    specs: {
      type: "Iate 60 pés",
      rooms: "3 Quartos",
      bathrooms: "2 Banheiros",
      living: "Sala 2 ambientes",
      kitchen: "Cozinha equipada"
    },
    amenities: [
      "Flybrigde com sofá e mesinha",
      "Coolers disponíveis", 
      "Caixa de som"
    ],
    schedule: {
      morning: "08:00 às 13:00",
      afternoon: "14:00 às 19:00"
    },
    pricing: {
      base: "R$ 12.000",
      barbecue: "R$ 200",
      duration: "5 horas",
      extraHour: "R$ 3.500,00",
      generator: "R$ 3.000,00"
    },
    destinations: [
      { name: "Mureta da Urca", price: "R$ 12.000" },
      { name: "Praia Vermelha", price: "R$ 13.000,00" },
      { name: "Adão e Eva (Niterói)", price: "R$ 13.000,00" },
      { name: "Copacabana", price: "R$ 15.000,00" },
      { name: "Ilhas Cagarras", price: "R$ 17.000,00" }
    ],
    category: "iate"
  },
  flyhi: {
    id: "flyhi",
    name: "LUÍSA VIII",
    type: "Iate 38 Pés",
    images: [
      "/lovable-uploads/7e95a21c-7588-479d-b209-a63d158402cf.png",
      "/lovable-uploads/2ebda6df-6882-4c6b-b682-b007670efd23.png",
      "/lovable-uploads/ef09472e-331c-4441-b5da-2117580f78b7.png",
      "/lovable-uploads/4e87113f-0897-4e88-9229-f6f955dcf309.png",
      "/lovable-uploads/d6e878ee-6e60-46e8-969a-16cc6c49f976.png",
      "/lovable-uploads/6e132063-1c8a-4b6b-ac64-0ef4627ea834.png",
      "/lovable-uploads/32d94aba-c4ba-4e2b-be73-c76551f11a47.png",
      "/lovable-uploads/cd17a893-4bbc-4a82-bf5b-84b03ea11881.png",
      "/lovable-uploads/dfd65f37-942d-4bf1-9741-434ae2430999.png",
      "/lovable-uploads/86c6955b-f427-49fe-a9ce-30905edd7328.png"
    ],
    capacity: 13,
    price: "R$ 3.200",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Luisa 8 38 Pés - 5 horas de passeio com combustível, marinheiro, tapetão flutuante, coolers e caixa de som de altíssima qualidade",
    specs: {
      type: "Iate 38 Pés",
      capacity: "13 passageiros",
      duration: "5 horas"
    },
    amenities: [
      "Combustível incluso",
      "Marinheiro incluso", 
      "Tapetão flutuante",
      "Coolers",
      "Caixa de som de altíssima qualidade"
    ],
    pricing: {
      urca: "R$ 3.200,00",
      praia_vermelha: "R$ 4.100,00",
      cagarras: "R$ 5.000,00"
    },
    destinations: [
      { name: "Roteiro Urca", price: "R$ 3.200,00" },
      { name: "Praia Vermelha", price: "R$ 4.100,00" },
      { name: "Ilha Cagarras", price: "R$ 5.000,00" }
    ],
    category: "iate"
  },
  mcell: {
    id: "mcell",
    name: "Lancha M Cell",
    type: "Lancha",
    images: [
      "/lovable-uploads/fe22476e-95ca-419b-b283-9a55cd96b7a9.png",
      "/lovable-uploads/e5534f93-7891-4fda-a6bc-5a690e3a8b07.png",
      "/lovable-uploads/b8119bf3-2ad4-4039-a641-241141e5a271.png",
      "/lovable-uploads/78a35fe0-9b73-49eb-a38f-276e7598a61c.png",
      "/lovable-uploads/0963c6ee-2248-45c5-a0b9-f0b690766e70.png",
      "/lovable-uploads/df6a16d5-de3e-41f1-ac3a-0cd65592878e.png"
    ],
    capacity: 9,
    price: "R$ 2.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha M Cell R$ 2.500,00 - Capacidade para 9 passageiros + 1 tripulante",
    specs: {
      type: "Lancha",
      capacity: "9 passageiros + 1 tripulante",
      departure: "Marina da Glória"
    },
    amenities: [
      "Cabine",
      "Som Bluetooth",
      "Churrasqueira",
      "Banheiro",
      "Ducha de Água Doce",
      "Flutuadores para banho de mar",
      "Tripulante incluso",
      "Limpeza inclusa",
      "Combustível incluso"
    ],
    schedule: {
      morning: "08h às 13h",
      afternoon: "14h às 19h"
    },
    pricing: {
      base: "R$ 2.500,00",
      barbecueStaff: "R$ 200,00",
      boardingFee: "R$ 200,00"
    },
    destinations: [
      { name: "Praia do Flamengo", price: "Incluso" },
      { name: "Enseada de Botafogo", price: "Incluso" },
      { name: "Mureta da Urca", price: "Incluso" },
      { name: "Flutuante Rio", price: "Incluso" },
      { name: "Praia da Bandeira", price: "Incluso" },
      { name: "Vista do Pão de Açúcar e Cristo Redentor", price: "Incluso" }
    ],
    category: "lancha"
  },
  comendador: {
    id: "comendador",
    name: "COMENDADOR",
    type: "Iate Executivo",
    images: [
      "/lovable-uploads/ca40959a-88f6-40ad-b3af-b8dca052c478.png",
      "/lovable-uploads/1c23f56d-2616-47e2-ba2d-f7bd359321e6.png",
      "/lovable-uploads/cc84d2d6-4777-40f2-b0c5-e4a7ed3cfb1f.png",
      "/lovable-uploads/d3999fcc-6362-452a-95f1-ee4837989846.png",
      "/lovable-uploads/51953857-9cc6-4f6b-860b-f10e344d8e94.png",
      "/lovable-uploads/f5fdfd5d-7cd9-457e-b76c-c16cbda72ee9.png",
      "/lovable-uploads/6dc5fa01-f68a-45c6-aa61-a7dcc64a66f5.png",
      "/lovable-uploads/1f2426c2-e57a-44a4-8978-c8a660c19472.png",
      "/lovable-uploads/82016ba6-204b-43a9-ab66-548244eb229b.png",
      "/lovable-uploads/3329870f-eac1-45fd-9e11-293311b5b514.png"
    ],
    capacity: 25,
    price: "R$ 7.700",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha 55 Pés com capacidade para 25 passageiros + 2 tripulantes",
    category: "iate",
    specs: {
      type: "Lancha 55 Pés",
      capacity: "25 passageiros + 2 tripulantes",
      duration: "5 horas",
      departure: "Late Clube Rio de Janeiro"
    },
    amenities: [
      "Quarto",
      "Salão", 
      "Flybridge",
      "Banheiro",
      "Solarium de proa",
      "Som Bluetooth",
      "TV",
      "Tomadas USB",
      "Cooler",
      "Ducha de água doce"
    ],
    schedule: {
      morning: "08h às 13h",
      afternoon: "14h às 19h"
    },
    included: [
      "Tripulação",
      "Limpeza", 
      "Combustível"
    ],
    itineraries: [
      { name: "Roteiro Urca", price: "R$ 7.700", description: "Passeio pela região da Urca" },
      { name: "Roteiro Praia do Morcego", price: "R$ 8.500", description: "Visita à Praia do Morcego" },
      { name: "Roteiro Praia Vermelha", price: "R$ 9.000", description: "Exploração da Praia Vermelha" },
      { name: "Roteiro Copacabana", price: "R$ 9.500", description: "Passeio pela costa de Copacabana" },
      { name: "Roteiro Ilha Cagarras", price: "R$ 11.000", description: "Aventura nas Ilhas Cagarras" }
    ]
  },
  dragao: {
    id: "dragao",
    name: "DRAGÃO",
    type: "Iate 41 pés",
    images: [
      "/lovable-uploads/063d534d-72c1-4861-964e-1013f7b5e1fb.png",
      "/lovable-uploads/78e24106-0662-4b8f-b957-01c6446386f0.png",
      "/lovable-uploads/e0c8a5e9-c885-4aaa-8a4e-2f6e32b615eb.png",
      "/lovable-uploads/206b8791-35ce-478d-b0ce-50f36209cdbb.png",
      "/lovable-uploads/811fbc3c-bbbb-49d6-9ef2-6b047f5dee31.png",
      "/lovable-uploads/991fc380-07b8-4ab0-869a-af16900c15e0.png",
      "/lovable-uploads/9b059d47-e2ac-4f6a-bccf-b5d9f4b6a2ae.png",
      "/lovable-uploads/b7ece9f5-ac8c-4875-8123-350d6f0bbae6.png",
      "/lovable-uploads/4babac2a-c5e7-4a90-a06f-af9ef7824b00.png",
      "/lovable-uploads/6dd56391-2365-43bd-9ac8-52d83aec7bbf.png"
    ],
    capacity: 17,
    price: "R$ 4.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "DRAGÃO - Iate 41 pés com capacidade para 17 passageiros + 2 tripulantes",
    specs: {
      type: "Iate 41 pés",
      capacity: "17 passageiros + 2 tripulantes",
      engines: "2x Mercedes 366",
      suite: "1 suíte cama de casal",
      bedroom: "1 quarto com beliche",
      living: "1 sala",
      bathrooms: "1 banheiro"
    },
    amenities: [
      "Microondas",
      "1 geladeira",
      "Fogão tipo Cooktop",
      "Churrasqueira",
      "Cooler em fibra / cooler portátil",
      "Reversor",
      "Som bluetooth",
      "Macarrões de flutuação",
      "1 TV"
    ],
    schedule: {
      morning: "09:00 às 14:00",
      afternoon: "15:00 às 20:00"
    },
    pricing: {
      base: "R$ 4.000,00",
      boardingFee: "R$ 200,00",
      barbecueStaff: "R$ 200,00"
    },
    category: "iate"
  },
  grandraray: {
    id: "grandraray",
    name: "GRAND RARAY",
    type: "Iate Premium",
    images: [
      "/lovable-uploads/ab7f00cd-e5bd-490d-8dce-6f179460fd9a.png",
      "/lovable-uploads/5f13a524-9591-48f4-abe1-09142e977c0b.png",
      "/lovable-uploads/87e26afc-23c1-4292-ac39-21654e2a4ae2.png",
      "/lovable-uploads/f148fa7f-081a-47aa-8a2f-6f9046d29202.png",
      "/lovable-uploads/98566a09-7cb2-424d-9275-585f86b768be.png",
      "/lovable-uploads/35e990d5-bd3d-4d00-9f4f-3de667a6597a.png",
      "/lovable-uploads/ae433d73-bf31-480e-826a-aef5e2f3a095.png",
      "/lovable-uploads/51031733-29b0-4420-9a6f-066c4d3edf2a.png",
      "/lovable-uploads/e9cb95c3-5a83-457a-b4a9-7a2fa8f54b7c.png",
      "/lovable-uploads/0ecc8726-94be-4e12-81c5-38126a0da8e4.png"
    ],
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "GRAND RARAY - Iate de luxo com equipamentos de primeira qualidade para passeios inesquecíveis de 5 horas.",
    specifications: [
      { label: "Capacidade", value: "20 passageiros" },
      { label: "Duração", value: "5 horas de passeio" },
      { label: "Embarque", value: "Marina da Glória - RJ" },
      { label: "Tipo", value: "Iate Premium" }
    ],
    amenities: [
      "Combustível incluído",
      "Marinheiro experiente",
      "Coolers para bebidas",
      "Caixa de som de altíssima qualidade",
      "Tapetão flutuante"
    ],
    routes: [
      { name: "Roteiro Urca", price: "R$ 7.000,00" },
      { name: "Roteiro Praia Vermelha", price: "R$ 8.000,00" },
      { name: "Roteiro Niterói", price: "R$ 8.000,00" },
      { name: "Roteiro Ilha Cagarras/Copacabana", price: "R$ 9.500,00" }
    ],
    category: "iate"
  },
  "lady-ruth": {
    id: "lady-ruth",
    name: "LADY RUTH",
    type: "Lancha Premium",
    images: [ladyRuthImage],
    capacity: 13,
    price: "R$ 1.999",
    originalPrice: "R$ 2.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lady Ruth com 5 horas de excelente passeio",
    category: "lancha"
  },
  mangata: {
    id: "mangata",
    name: "MANGATA",
    type: "Sessa Marine C44",
    images: [
      "/lovable-uploads/8e04365e-545e-47e3-a14d-2cf6b644e2f4.png",
      "/lovable-uploads/573e02ed-2755-4218-b4ae-59587be20f1f.png",
      "/lovable-uploads/c4d8a843-a471-4f01-bfde-70dcc59e78fc.png",
      "/lovable-uploads/9f2b0b5a-591e-4e81-8dc0-d2adf30704f5.png",
      "/lovable-uploads/196fb554-9eaf-4ec8-83fd-da7bba0e29a6.png",
      "/lovable-uploads/5f810146-e5c7-4dbb-a4d8-2c19d4ed864c.png",
      "/lovable-uploads/fd531e0d-a5e6-4d20-a1c0-9f8d20807efe.png",
      "/lovable-uploads/469716cc-1617-43e4-bb71-3e407cbe189b.png",
      "/lovable-uploads/ce6010dd-9d14-4611-a976-9b8a0c6da58b.png",
      "/lovable-uploads/a3fe145a-ff25-4b11-a5a6-5acffa9abdd0.png"
    ],
    capacity: 12,
    price: "R$ 11.500",
    rating: 4.9,
    duration: "5h",
    location: "Late Clube Rio de Janeiro",
    description: "Sessa Marine C44 - Iate de luxo com 44 pés oferecendo máximo conforto e elegância para até 12 passageiros.",
    specs: {
      model: "Sessa Marine C44",
      length: "44 pés",
      capacity: "12 passageiros + marinheiro",
      duration: "5 horas de passeio",
      boarding: "Late Clube Rio de Janeiro"
    },
    amenities: [
      "Gerador Mase 10.5",
      "Antena Digital",
      "2 Quartos",
      "2 Banheiros", 
      "1 Cozinha + Mesa de Jantar",
      "TV e Sistema de Som Independente nos 3 Ambientes",
      "2 Freezers",
      "1 Geladeira",
      "1 Microondas",
      "Ar Condicionado",
      "Boiler",
      "Área Gourmet Elétrica na Popa",
      "Churrasqueira Elétrica e Pia",
      "Churrasqueira a Carvão",
      "HT Elétrico",
      "GPS",
      "Som",
      "Plataforma Submergível",
      "Luzes Subaquáticas"
    ],
    pricing: {
      complete_tour: "R$ 11.500,00"
    },
    destinations: [
      { 
        name: "Roteiro Completo", 
        price: "R$ 11.500,00",
        description: "Urca / Botafogo / Copacabana x Cagarras ou Ilhas Tijucas (Roteiro completo mediante condições do mar)"
      }
    ],
    additionalFees: [
      {
        name: "Taxa de Churrasqueiro",
        price: "R$ 200,00",
        description: "Serviço de churrasqueiro profissional"
      }
    ],
    category: "iate"
  },
  prestige: {
    id: "prestige",
    name: "PRESTIGE",
    type: "Lancha Premium",
    images: [prestigeImage],
    capacity: 20,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Lancha Prestige 600 fly, dois motores volvo d 13",
    category: "lancha"
  },
  rebeca: {
    id: "rebeca",
    name: "YACHT REBECA",
    type: "Iate Luxury",
    images: [rebecaImage],
    capacity: 16,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Phantom 620 Pininfarina de 62 pés com design italiano",
    category: "iate"
  },
  oceano: {
    id: "oceano",
    name: "OCEANO",
    type: "Catamarã",
    images: [oceanoImage],
    capacity: 65,
    price: "R$ 16.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã de até 65 passageiros com horários válidos por 30 dias",
    category: "catamara"
  },
  blau: {
    id: "blau",
    name: "CATAMARÃ BLAU",
    type: "Catamarã Premium",
    images: [blauImage],
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã Blau com embarque na Marina da Glória",
    category: "catamara"
  },
  nossa: {
    id: "nossa",
    name: "NOSSA",
    type: "Iate Premium",
    images: [nossaImage],
    capacity: 25,
    price: "R$ 7.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Pershing 52HT com gerador 110v e equipamentos completos",
    category: "iate"
  },
  seven: {
    id: "seven",
    name: "SEVEN",
    type: "Lancha Premium",
    images: [sevenImage],
    capacity: 15,
    price: "R$ 7.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha intermarine 44 pés com embarque na Marina da Glória",
    category: "lancha"
  },
  senna: {
    id: "senna",
    name: "SENNA",
    type: "Iate Premium",
    images: [
      "/lovable-uploads/758a21a0-0f35-4d63-8802-bf9fb5543f54.png",
      "/lovable-uploads/8131796c-d7a3-477b-89a6-60494d308e84.png",
      "/lovable-uploads/147de007-1602-410f-8662-c8a62f840359.png",
      "/lovable-uploads/e98e201d-3cb5-471a-a4c6-8dcb022e66a2.png",
      "/lovable-uploads/6c8c5d8f-8985-40ad-aedd-99f6b60b1951.png",
      "/lovable-uploads/e22a0c7e-c9ab-46ef-8e0e-434f6629e895.png",
      "/lovable-uploads/2fe01d15-281c-4460-bb7b-16f136ed1c04.png",
      "/lovable-uploads/6dc8f7ff-d6f4-48b1-a368-3938b40c7971.png",
      "/lovable-uploads/2d8ff364-27b0-4048-99fa-10922bf350ba.png",
      "/lovable-uploads/c1acaf15-4572-4d26-a649-e6f61c8bedc2.png"
    ],
    capacity: 18,
    price: "R$ 7.700",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória (Pier Nobre)",
    description: "Senna R$ 7.700,00 - Capacidade: 18 passageiros + 2 tripulantes",
    specs: {
      type: "Iate Premium",
      engines: "Motores de centro diesel 500HP",
      capacity: "18 passageiros + 2 tripulantes",
      rooms: "2 quartos",
      bathrooms: "2 banheiros (1 suíte)",
      living: "Sala ampla",
      kitchen: "Cozinha completa",
      extras: "Fly e solário de proa muito espaçosos"
    },
    amenities: [
      "Som conexão Bluetooth",
      "Combustível incluso",
      "Comandante incluso",
      "Limpeza inclusa",
      "Macarrão e tapete flutuante"
    ],
    schedule: {
      weekday: "Dia de semana horário flexível",
      weekend: "Fins de semana e feriados das 09:00 às 14:00 e 14:30 às 19:30"
    },
    pricing: {
      base: "R$ 7.700,00",
      barbecue: "R$ 200,00 (opcional)"
    },
    destinations: [
      { name: "Urca", price: "R$ 7.700,00" },
      { name: "Praia Vermelha e Urca ou Adão & Eva e Urca", price: "R$ 8.500,00" },
      { name: "Praia de Copacabana", price: "R$ 9.500,00" },
      { name: "Baía de Guanabara ou Ilhas Cagarras ou Praia de Itaipu", price: "R$ 10.000,00" }
    ],
    category: "iate"
  },
  luisa: {
    id: "luisa",
    name: "LUÍSA V",
    type: "Iate Premium",
    images: [
      "/lovable-uploads/03c21177-517e-46bb-ba14-3d5e3e92b548.png",
      "/lovable-uploads/5b46ecc7-6d2f-49f9-97e1-18cd69e70334.png",
      "/lovable-uploads/971d60d5-6cd7-46b1-80e0-b22fc9971ecf.png",
      "/lovable-uploads/f445fc67-3320-4ec8-9fb4-242ae592d18c.png",
      "/lovable-uploads/729365c1-b3c2-4db7-8b9d-931a2f7fb1f7.png",
      "/lovable-uploads/3e2e65a7-195a-4f5e-9cf9-39c176c713cd.png",
      "/lovable-uploads/2b635aac-c2f0-4db3-a82a-e8c116893024.png",
      "/lovable-uploads/c84fec1a-ab0f-4007-ae85-08012b4590c2.png",
      "/lovable-uploads/da929e32-33ee-4fc1-97c0-d366d63ff457.png",
      "/lovable-uploads/8ce2e68b-6ed0-47b8-9f7b-df5ab588c7d2.png"
    ],
    capacity: 15,
    price: "R$ 3.200",
    rating: 4.6,
    duration: "5h",
    location: "Marina da Glória",
    description: "LUÍSA V - Iate Premium para até 15 passageiros com comodidades completas",
    schedule: {
      morning: "08:00 às 13:00",
      afternoon: "13:00 às 19:00"
    },
    pricing: {
      base: "R$ 3.200,00",
      barbecueStaff: "R$ 200,00",
      boardingFee: "R$ 200,00"
    },
    destinations: [
      { name: "Marina da Gloria x Flamengo x Aeroporto x Urca", price: "R$ 3.200,00" },
      { name: "Praia Vermelha", price: "R$ 4.500,00" },
      { name: "Ilhas Cagarras ou Itaipu (adicional)", price: "R$ 5.500,00" }
    ],
    amenities: [
      "Marinheiro incluso",
      "Combustível incluso",
      "Coolers disponíveis",
      "Macarrão flutuantes",
      "Churrasqueira"
    ],
    category: "iate"
  }
};

const VesselDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    duration: "",
    guests: "",
    route: "",
    message: ""
  });

  const vessel = id ? vesselsData[id as keyof typeof vesselsData] : null;

  if (!vessel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Embarcação não encontrada</h2>
          <Button onClick={() => navigate("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    const message = `
🚤 *RESERVA BRAVISSEA*

*Embarcação:* ${vessel.name}
*Nome:* ${bookingForm.name}
*Email:* ${bookingForm.email}
*Telefone:* ${bookingForm.phone}
*Data:* ${bookingForm.date}
*Duração:* ${bookingForm.duration}
*Passageiros:* ${bookingForm.guests}
*Roteiro:* ${bookingForm.route}

*Mensagem adicional:*
${bookingForm.message}

Aguardo confirmação! 🌊
    `;
    
    const whatsappUrl = `https://wa.me/5521974004415?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-secondary/30 py-8">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às embarcações
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {vessel.name}
                </h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <Badge variant="outline">{vessel.type}</Badge>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {vessel.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                    {vessel.rating}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-3xl font-bold text-primary">
                  {vessel.price}
                </div>
                <div className="text-sm text-muted-foreground">por dia</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Galeria e Detalhes */}
            <div className="lg:col-span-2">
              {/* Galeria com Carrossel */}
              <div className="mb-8">
                <VesselImageCarousel
                  images={vessel.images}
                  vesselName={vessel.name}
                />
              </div>

              {/* Descrição Organizada */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Sobre a {vessel.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    {vessel.description}
                  </p>
                  
                  {vessel.id === "segue" && (
                    <div className="space-y-8">
                      {/* Especificações Técnicas */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                          <Waves className="h-5 w-5 mr-2" />
                          Especificações Técnicas
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Comprimento</span>
                            <p className="text-lg font-semibold">58 Pés</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Motores</span>
                            <p className="text-lg font-semibold">2 x Volvo 950 IPS</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                            <p className="text-lg font-semibold">{vessel.capacity} pessoas</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                            <p className="text-lg font-semibold">{vessel.duration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Acomodações */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          Acomodações
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-muted/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-primary mb-1">3</div>
                            <p className="text-sm font-medium">Quartos</p>
                            <p className="text-xs text-muted-foreground">1 suíte, 1 cabine solteiro/casal, 1 cabine de proa</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-primary mb-1">2</div>
                            <p className="text-sm font-medium">Banheiros</p>
                            <p className="text-xs text-muted-foreground">1 banheiro social</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-primary mb-1">1</div>
                            <p className="text-sm font-medium">Cozinha</p>
                            <p className="text-xs text-muted-foreground">Completa com geladeiras</p>
                          </div>
                        </div>
                      </div>

                      {/* Comodidades */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                          <Coffee className="h-5 w-5 mr-2" />
                          Comodidades e Entretenimento
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                            <Music className="h-6 w-6 text-primary mr-3" />
                            <div>
                              <p className="font-medium">Som Bluetooth</p>
                              <p className="text-sm text-muted-foreground">Sistema de áudio conectado</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                            <Sun className="h-6 w-6 text-primary mr-3" />
                            <div>
                              <p className="font-medium">Churrasqueira a Carvão</p>
                              <p className="text-sm text-muted-foreground">Para refeições a bordo</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                            <Coffee className="h-6 w-6 text-primary mr-3" />
                            <div>
                              <p className="font-medium">Sala Espaçosa</p>
                              <p className="text-sm text-muted-foreground">Ambiente confortável</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                            <MapPin className="h-6 w-6 text-primary mr-3" />
                            <div>
                              <p className="font-medium">Localização Premium</p>
                              <p className="text-sm text-muted-foreground">{vessel.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Destinos */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          Destinos Disponíveis
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border border-primary/20 p-4 rounded-lg">
                            <h5 className="font-semibold text-primary mb-2">Enseada da Urca</h5>
                            <p className="text-sm text-muted-foreground">Águas calmas e vista privilegiada do Pão de Açúcar</p>
                          </div>
                          <div className="border border-primary/20 p-4 rounded-lg">
                            <h5 className="font-semibold text-primary mb-2">Praia de Adão e Eva</h5>
                            <p className="text-sm text-muted-foreground">Praia paradisíaca para relaxar e curtir o dia</p>
                          </div>
                        </div>
                      </div>
                     </div>
                   )}
                   
                   {vessel.id === "myway" && (
                     <div className="space-y-8">
                       {/* Especificações Técnicas */}
                       <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                           <Waves className="h-5 w-5 mr-2" />
                           Especificações Técnicas
                         </h4>
                         <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tipo</span>
                              <p className="text-lg font-semibold">{(vessel as any).specs?.type}</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Quartos</span>
                              <p className="text-lg font-semibold">{(vessel as any).specs?.rooms}</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Banheiros</span>
                              <p className="text-lg font-semibold">{(vessel as any).specs?.bathrooms}</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Sala</span>
                              <p className="text-lg font-semibold">{(vessel as any).specs?.living}</p>
                            </div>
                         </div>
                       </div>

                       {/* Comodidades */}
                       <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                           <Coffee className="h-5 w-5 mr-2" />
                           Comodidades
                         </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {(vessel as any).amenities?.map((amenity: string, index: number) => (
                             <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg">
                               <Coffee className="h-6 w-6 text-primary mr-3" />
                               <div>
                                 <p className="font-medium">{amenity}</p>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>

                       {/* Horários */}
                       <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                           <Clock className="h-5 w-5 mr-2" />
                           Horários Disponíveis
                         </h4>
                         <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Manhã</span>
                              <p className="text-lg font-semibold">{(vessel as any).schedule?.morning}</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tarde</span>
                              <p className="text-lg font-semibold">{(vessel as any).schedule?.afternoon}</p>
                            </div>
                         </div>
                       </div>

                       {/* Tarifas */}
                       <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                           <Sun className="h-5 w-5 mr-2" />
                           Tarifas e Extras
                         </h4>
                         <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Valor Base</span>
                              <p className="text-lg font-semibold">{(vessel as any).pricing?.base}</p>
                              <p className="text-xs text-muted-foreground">{(vessel as any).pricing?.duration}</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Taxa Churrasco</span>
                              <p className="text-lg font-semibold">{(vessel as any).pricing?.barbecue}</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Hora Extra</span>
                              <p className="text-lg font-semibold">{(vessel as any).pricing?.extraHour}</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Gerador</span>
                              <p className="text-lg font-semibold">{(vessel as any).pricing?.generator}</p>
                              <p className="text-xs text-muted-foreground">Ar-condicionado, geladeira, microondas e fogão</p>
                            </div>
                         </div>
                       </div>

                       {/* Destinos */}
                       <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                           <MapPin className="h-5 w-5 mr-2" />
                           Roteiros e Preços
                         </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {(vessel as any).destinations?.map((destination: any, index: number) => (
                             <div key={index} className="border border-primary/20 p-4 rounded-lg">
                               <div className="flex justify-between items-center">
                                 <h5 className="font-semibold text-primary">{destination.name}</h5>
                                 <span className="font-bold text-lg">{destination.price}</span>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                      </div>
                     )}

                     {vessel.id === "tecnomarine" && (
                       <div className="space-y-8">
                         {/* Especificações Técnicas */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <Waves className="h-5 w-5 mr-2" />
                             Especificações Técnicas
                           </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tamanho</span>
                                <p className="text-lg font-semibold">52 pés</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                                <p className="text-lg font-semibold">20 passageiros</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                                <p className="text-lg font-semibold">5 horas</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Embarque</span>
                                <p className="text-lg font-semibold">Marina da Glória - RJ</p>
                              </div>
                           </div>
                         </div>

                         {/* Valores Inclusos */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <Coffee className="h-5 w-5 mr-2" />
                             Valores Inclusos
                           </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Combustível incluído</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Marinheiro profissional</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">5 horas de passeio</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Embarque na Marina da Glória</p>
                                </div>
                              </div>
                           </div>
                         </div>

                         {/* Roteiros e Preços */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <MapPin className="h-5 w-5 mr-2" />
                             Roteiros e Preços
                           </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-semibold text-primary">Roteiro Urca</h5>
                                  <span className="font-bold text-lg">R$ 10.000,00</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-semibold text-primary">Roteiro Praia Vermelha</h5>
                                  <span className="font-bold text-lg">R$ 11.000,00</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-semibold text-primary">Copacabana</h5>
                                  <span className="font-bold text-lg">R$ 13.800,00</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-semibold text-primary">Cagarras</h5>
                                  <span className="font-bold text-lg">R$ 15.000,00</span>
                                </div>
                              </div>
                           </div>
                         </div>

                         {/* Taxas Adicionais */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <Sun className="h-5 w-5 mr-2" />
                             Taxas Adicionais
                           </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Taxa do Churrasqueiro</span>
                                <p className="text-lg font-semibold">R$ 200,00</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Taxa de Embarque</span>
                                <p className="text-lg font-semibold">R$ 200,00</p>
                              </div>
                           </div>
                         </div>
                       </div>
                     )}

                    {vessel.id === "senna" && (
                      <div className="space-y-8">
                        {/* Especificações Técnicas */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Waves className="h-5 w-5 mr-2" />
                            Especificações Técnicas
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tipo</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.type}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.capacity}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Motores</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.engines}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Quartos</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.rooms}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Banheiros</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.bathrooms}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Extras</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.extras}</p>
                             </div>
                          </div>
                        </div>

                        {/* Comodidades */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Coffee className="h-5 w-5 mr-2" />
                            Comodidades
                          </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             {(vessel as any).amenities?.map((amenity: string, index: number) => (
                              <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">{amenity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Horários */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            Horários Disponíveis
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Dias de Semana</span>
                               <p className="text-lg font-semibold">{(vessel as any).schedule?.weekday}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Fins de Semana</span>
                               <p className="text-lg font-semibold">{(vessel as any).schedule?.weekend}</p>
                             </div>
                          </div>
                        </div>

                        {/* Tarifas */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Sun className="h-5 w-5 mr-2" />
                            Tarifas e Extras
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Valor Base</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.base}</p>
                               <p className="text-xs text-muted-foreground">5 horas</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Churrasqueira</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.barbecue}</p>
                             </div>
                          </div>
                        </div>

                        {/* Destinos */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <MapPin className="h-5 w-5 mr-2" />
                            Roteiros e Preços
                          </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             {(vessel as any).destinations?.map((destination: any, index: number) => (
                              <div key={index} className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-semibold text-primary">{destination.name}</h5>
                                  <span className="font-bold text-lg">{destination.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {vessel.id === "luisa" && (
                      <div className="space-y-8">
                        {/* Horários */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            Horários Disponíveis
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Manhã</span>
                               <p className="text-lg font-semibold">{(vessel as any).schedule?.morning}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tarde</span>
                               <p className="text-lg font-semibold">{(vessel as any).schedule?.afternoon}</p>
                             </div>
                          </div>
                        </div>

                        {/* Tarifas */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Sun className="h-5 w-5 mr-2" />
                            Tarifas e Extras
                          </h4>
                          <div className="grid md:grid-cols-3 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Valor Base</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.base}</p>
                               <p className="text-xs text-muted-foreground">5 horas</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Taxa Churrasqueiro</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.barbecueStaff}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Taxa Embarque</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.boardingFee}</p>
                             </div>
                          </div>
                        </div>

                        {/* Destinos */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <MapPin className="h-5 w-5 mr-2" />
                            Roteiros e Preços
                          </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             {(vessel as any).destinations?.map((destination: any, index: number) => (
                              <div key={index} className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-semibold text-primary">{destination.name}</h5>
                                  <span className="font-bold text-lg">{destination.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Comodidades */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Coffee className="h-5 w-5 mr-2" />
                            Incluído
                          </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             {(vessel as any).amenities?.map((amenity: string, index: number) => (
                              <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">{amenity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {vessel.id === "dragao" && (
                      <div className="space-y-8">
                        {/* Especificações Técnicas */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Waves className="h-5 w-5 mr-2" />
                            Especificações Técnicas
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tipo</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.type}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.capacity}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Motores</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.engines}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Suíte</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.suite}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Quarto</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.bedroom}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Banheiros</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.bathrooms}</p>
                             </div>
                          </div>
                        </div>

                        {/* Comodidades */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Coffee className="h-5 w-5 mr-2" />
                            Comodidades
                          </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             {(vessel as any).amenities?.map((amenity: string, index: number) => (
                              <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">{amenity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Horários */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            Horários Disponíveis
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Manhã</span>
                               <p className="text-lg font-semibold">{(vessel as any).schedule?.morning}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tarde</span>
                               <p className="text-lg font-semibold">{(vessel as any).schedule?.afternoon}</p>
                             </div>
                          </div>
                        </div>

                        {/* Tarifas */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Sun className="h-5 w-5 mr-2" />
                            Tarifas e Extras
                          </h4>
                          <div className="grid md:grid-cols-3 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Valor Base</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.base}</p>
                               <p className="text-xs text-muted-foreground">5 horas</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Taxa de Embarque</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.boardingFee}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Taxa Churrasqueiro</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.barbecueStaff}</p>
                             </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {vessel.id === "mcell" && (
                      <div className="space-y-8">
                        {/* Especificações Técnicas */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Waves className="h-5 w-5 mr-2" />
                            Especificações Técnicas
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tipo</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.type}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.capacity}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Embarque</span>
                               <p className="text-lg font-semibold">{(vessel as any).specs?.departure}</p>
                             </div>
                          </div>
                        </div>

                        {/* Comodidades */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Coffee className="h-5 w-5 mr-2" />
                            Comodidades
                          </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             {(vessel as any).amenities?.map((amenity: string, index: number) => (
                              <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">{amenity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Horários */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            Horários Disponíveis
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Manhã</span>
                               <p className="text-lg font-semibold">{(vessel as any).schedule?.morning}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tarde</span>
                               <p className="text-lg font-semibold">{(vessel as any).schedule?.afternoon}</p>
                             </div>
                          </div>
                        </div>

                        {/* Tarifas */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <Sun className="h-5 w-5 mr-2" />
                            Tarifas e Extras
                          </h4>
                          <div className="grid md:grid-cols-3 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Valor Base</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.base}</p>
                               <p className="text-xs text-muted-foreground">5 horas</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Taxa Churrasqueiro</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.barbecueStaff}</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Taxa de Embarque</span>
                               <p className="text-lg font-semibold">{(vessel as any).pricing?.boardingFee}</p>
                             </div>
                          </div>
                        </div>

                        {/* Roteiro */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                            <MapPin className="h-5 w-5 mr-2" />
                            Roteiro Urca
                          </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             {(vessel as any).destinations?.map((destination: any, index: number) => (
                              <div key={index} className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-semibold text-primary">{destination.name}</h5>
                                  <span className="font-bold text-sm text-green-600">{destination.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                     )}
                     
                     {vessel.id === "flyhi" && (
                       <div className="space-y-8">
                         {/* Especificações Técnicas */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <Waves className="h-5 w-5 mr-2" />
                             Especificações Técnicas
                           </h4>
                           <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tipo</span>
                                <p className="text-lg font-semibold">{(vessel as any).specs?.type}</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                                <p className="text-lg font-semibold">{(vessel as any).specs?.capacity}</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                                <p className="text-lg font-semibold">{(vessel as any).specs?.duration}</p>
                              </div>
                           </div>
                         </div>

                         {/* Comodidades */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <Coffee className="h-5 w-5 mr-2" />
                             Comodidades Incluídas
                           </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {(vessel as any).amenities?.map((amenity: string, index: number) => (
                               <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg">
                                 <Coffee className="h-6 w-6 text-primary mr-3" />
                                 <div>
                                   <p className="font-medium">{amenity}</p>
                                 </div>
                               </div>
                             ))}
                           </div>
                         </div>

                         {/* Preços por Roteiro */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <Sun className="h-5 w-5 mr-2" />
                             Preços por Roteiro
                           </h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              {(vessel as any).destinations?.map((destination: any, index: number) => (
                               <div key={index} className="border border-primary/20 p-4 rounded-lg text-center">
                                 <h5 className="font-semibold text-primary mb-2">{destination.name}</h5>
                                 <span className="text-2xl font-bold text-green-600">{destination.price}</span>
                               </div>
                             ))}
                           </div>
                         </div>
                       </div>
                     )}
                     
                     {vessel.id === "grandraray" && (
                       <div className="space-y-8">
                         {/* Especificações Técnicas */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <Waves className="h-5 w-5 mr-2" />
                             Especificações Técnicas
                           </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                               <p className="text-lg font-semibold">20 passageiros</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                               <p className="text-lg font-semibold">5 horas de passeio</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Embarque</span>
                               <p className="text-lg font-semibold">Marina da Glória - RJ</p>
                             </div>
                             <div className="bg-muted/50 p-4 rounded-lg">
                               <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tipo</span>
                               <p className="text-lg font-semibold">Iate Premium</p>
                             </div>
                           </div>
                         </div>

                         {/* Comodidades Incluídas */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <Coffee className="h-5 w-5 mr-2" />
                             Comodidades Incluídas
                           </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                               <Coffee className="h-6 w-6 text-primary mr-3" />
                               <div>
                                 <p className="font-medium">Combustível incluído</p>
                               </div>
                             </div>
                             <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                               <Users className="h-6 w-6 text-primary mr-3" />
                               <div>
                                 <p className="font-medium">Marinheiro experiente</p>
                               </div>
                             </div>
                             <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                               <Box className="h-6 w-6 text-primary mr-3" />
                               <div>
                                 <p className="font-medium">Coolers para bebidas</p>
                               </div>
                             </div>
                             <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                               <Music className="h-6 w-6 text-primary mr-3" />
                               <div>
                                 <p className="font-medium">Caixa de som de altíssima qualidade</p>
                               </div>
                             </div>
                             <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                               <Waves className="h-6 w-6 text-primary mr-3" />
                               <div>
                                 <p className="font-medium">Tapetão flutuante</p>
                               </div>
                             </div>
                           </div>
                         </div>

                         {/* Roteiros e Preços */}
                         <div>
                           <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                             <MapPin className="h-5 w-5 mr-2" />
                             Roteiros e Preços
                           </h4>
                           <div className="grid md:grid-cols-2 gap-4">
                             <div className="border border-primary/20 p-4 rounded-lg">
                               <div className="flex justify-between items-center">
                                 <h5 className="font-semibold text-primary">Roteiro Urca</h5>
                                 <span className="font-bold text-lg text-green-600">R$ 7.000,00</span>
                               </div>
                             </div>
                             <div className="border border-primary/20 p-4 rounded-lg">
                               <div className="flex justify-between items-center">
                                 <h5 className="font-semibold text-primary">Roteiro Praia Vermelha</h5>
                                 <span className="font-bold text-lg text-green-600">R$ 8.000,00</span>
                               </div>
                             </div>
                             <div className="border border-primary/20 p-4 rounded-lg">
                               <div className="flex justify-between items-center">
                                 <h5 className="font-semibold text-primary">Roteiro Niterói</h5>
                                 <span className="font-bold text-lg text-green-600">R$ 8.000,00</span>
                               </div>
                             </div>
                             <div className="border border-primary/20 p-4 rounded-lg">
                               <div className="flex justify-between items-center">
                                 <h5 className="font-semibold text-primary">Roteiro Ilha Cagarras/Copacabana</h5>
                                 <span className="font-bold text-lg text-green-600">R$ 9.500,00</span>
                               </div>
                             </div>
                           </div>
                         </div>
                        </div>
                      )}

                      {/* Informações específicas da MANGATA */}
                      {vessel.id === "mangata" && (
                        <div className="space-y-6">
                          {/* Especificações Técnicas */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Anchor className="h-5 w-5 mr-2" />
                              Especificações Técnicas
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Shield className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Modelo: Sessa Marine C44</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Anchor className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Tamanho: 44 pés</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Users className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Capacidade: 12 pessoas + marinheiro</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Clock className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Duração: 5 horas de passeio</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <MapPin className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Embarque: Late Clube Rio de Janeiro</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Equipamentos e Acessórios */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Zap className="h-5 w-5 mr-2" />
                              Equipamentos e Acessórios
                            </h4>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Zap className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Gerador Mase 10.5</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Waves className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Antena Digital</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Shield className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">2 Quartos</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">2 Banheiros</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">1 Cozinha + Mesa de Jantar</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Music className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">TV e Som nos 3 Ambientes</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Box className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">2 Freezers</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Box className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">1 Geladeira</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">1 Microondas</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Sun className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Ar Condicionado</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Boiler</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Shield className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Área Gourmet Elétrica na Popa</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Churrasqueira Elétrica e Pia</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Shield className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Churrasqueira a Carvão</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Waves className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">HT Elétrico</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <MapPin className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">GPS</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Music className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Som</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Waves className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Plataforma Submergível</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Sun className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Luzes Subaquáticas</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Roteiro e Preços */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <MapPin className="h-5 w-5 mr-2" />
                              Roteiro e Preços
                            </h4>
                            <div className="border border-primary/20 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5">
                              <div className="text-center">
                                <h5 className="font-semibold text-primary text-xl mb-2">Roteiro Completo</h5>
                                <p className="text-muted-foreground mb-4">
                                  Urca / Botafogo / Copacabana x Cagarras ou Ilhas Tijucas
                                </p>
                                <p className="text-sm text-muted-foreground mb-4">
                                  (Roteiro completo mediante condições do mar)
                                </p>
                                <span className="font-bold text-3xl text-green-600">R$ 11.500,00</span>
                              </div>
                            </div>
                          </div>

                          {/* Taxas Adicionais */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Coffee className="h-5 w-5 mr-2" />
                              Taxas Adicionais
                            </h4>
                            <div className="border border-orange-200 p-4 rounded-lg bg-orange-50">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h5 className="font-semibold text-orange-800">Taxa de Churrasqueiro</h5>
                                  <p className="text-sm text-orange-600">Serviço de churrasqueiro profissional</p>
                                </div>
                                <span className="font-bold text-lg text-orange-600">R$ 200,00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Informações específicas do COMENDADOR */}
                      {vessel.id === "comendador" && (
                        <div className="space-y-6">
                          {/* Especificações Técnicas */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Anchor className="h-5 w-5 mr-2" />
                              Especificações Técnicas
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tipo</span>
                                <p className="text-lg font-semibold">Lancha 55 Pés</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                                <p className="text-lg font-semibold">25 passageiros + 2 tripulantes</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                                <p className="text-lg font-semibold">5 horas</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Embarque</span>
                                <p className="text-lg font-semibold">Late Clube Rio de Janeiro</p>
                              </div>
                            </div>
                          </div>

                          {/* Comodidades */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Coffee className="h-5 w-5 mr-2" />
                              Comodidades
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Shield className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">Quarto</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">Salão</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Waves className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">Flybridge</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Shield className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">Banheiro</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Sun className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">Solarium de proa</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Music className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">Som Bluetooth</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Monitor className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">TV</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Smartphone className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">Tomadas USB</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">Cooler</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Droplets className="h-6 w-6 text-primary mr-3" />
                                <div><p className="font-medium">Ducha de água doce</p></div>
                              </div>
                            </div>
                          </div>

                          {/* Horários Disponíveis */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Clock className="h-5 w-5 mr-2" />
                              Horários Disponíveis
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Manhã</span>
                                <p className="text-lg font-semibold">08h às 13h</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tarde</span>
                                <p className="text-lg font-semibold">14h às 19h</p>
                              </div>
                            </div>
                          </div>

                          {/* Incluso */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Shield className="h-5 w-5 mr-2" />
                              Incluso para seu conforto
                            </h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Users className="h-6 w-6 text-green-600 mr-3" />
                                <div><p className="font-medium text-green-800">Tripulação</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Sparkles className="h-6 w-6 text-green-600 mr-3" />
                                <div><p className="font-medium text-green-800">Limpeza</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Fuel className="h-6 w-6 text-green-600 mr-3" />
                                <div><p className="font-medium text-green-800">Combustível</p></div>
                              </div>
                            </div>
                          </div>

                          {/* Roteiros e Preços */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <MapPin className="h-5 w-5 mr-2" />
                              Roteiros Disponíveis
                            </h4>
                            <div className="grid gap-4">
                              <div className="border border-primary/20 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-semibold text-blue-800">Roteiro Urca</h5>
                                    <p className="text-sm text-blue-600">Passeio pela região da Urca</p>
                                  </div>
                                  <span className="font-bold text-xl text-blue-700">R$ 7.700</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-semibold text-green-800">Roteiro Praia do Morcego</h5>
                                    <p className="text-sm text-green-600">Visita à Praia do Morcego</p>
                                  </div>
                                  <span className="font-bold text-xl text-green-700">R$ 8.500</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-semibold text-orange-800">Roteiro Praia Vermelha</h5>
                                    <p className="text-sm text-orange-600">Exploração da Praia Vermelha</p>
                                  </div>
                                  <span className="font-bold text-xl text-orange-700">R$ 9.000</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-semibold text-purple-800">Roteiro Copacabana</h5>
                                    <p className="text-sm text-purple-600">Passeio pela costa de Copacabana</p>
                                  </div>
                                  <span className="font-bold text-xl text-purple-700">R$ 9.500</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-semibold text-emerald-800">Roteiro Ilha Cagarras</h5>
                                    <p className="text-sm text-emerald-600">Aventura nas Ilhas Cagarras</p>
                                  </div>
                                  <span className="font-bold text-xl text-emerald-700">R$ 11.000</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {vessel.id !== "segue" && vessel.id !== "myway" && vessel.id !== "senna" && vessel.id !== "luisa" && vessel.id !== "dragao" && vessel.id !== "mcell" && vessel.id !== "flyhi" && vessel.id !== "grandraray" && vessel.id !== "mangata" && vessel.id !== "comendador" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Especificações</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span>Capacidade:</span>
                            <span>{vessel.capacity} pessoas</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Duração:</span>
                            <span>{vessel.duration}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Localização:</span>
                            <span>{vessel.location}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Avaliação:</span>
                            <span>⭐ {vessel.rating}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Categoria:</span>
                            <span className="capitalize">{vessel.category}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recursos Gerais */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Users className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium">{vessel.capacity} pessoas</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Clock className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium">{vessel.duration}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <MapPin className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium">{vessel.location}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <Star className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-medium">⭐ {vessel.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Reserva */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Waves className="h-5 w-5 mr-2 text-primary" />
                    Fazer Reserva
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input 
                      id="name"
                      value={bookingForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone"
                      value={bookingForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(21) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Data preferida</Label>
                    <Input 
                      id="date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duração</Label>
                    <Select onValueChange={(value) => handleInputChange('duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4h">4 horas</SelectItem>
                        <SelectItem value="6h">6 horas</SelectItem>
                        <SelectItem value="8h">8 horas (dia inteiro)</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="guests">Número de passageiros</Label>
                    <Select onValueChange={(value) => handleInputChange('guests', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Quantas pessoas?" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: vessel.capacity }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1} {i === 0 ? 'pessoa' : 'pessoas'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="route">Roteiro desejado</Label>
                    <Select onValueChange={(value) => handleInputChange('route', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha um roteiro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Baía de Guanabara">Baía de Guanabara</SelectItem>
                        <SelectItem value="Ilhas Tijucas">Ilhas Tijucas</SelectItem>
                        <SelectItem value="Angra dos Reis">Angra dos Reis</SelectItem>
                        <SelectItem value="Búzios">Búzios</SelectItem>
                        <SelectItem value="Copacabana/Cagarras">Copacabana/Cagarras</SelectItem>
                        <SelectItem value="Personalizado">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Mensagem (opcional)</Label>
                    <Textarea 
                      id="message"
                      value={bookingForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Alguma solicitação especial?"
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-primary hover:bg-primary-dark"
                    disabled={!bookingForm.name || !bookingForm.phone}
                  >
                    Enviar Reserva via WhatsApp
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Ao clicar, você será redirecionado para o WhatsApp com suas informações preenchidas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default VesselDetails;
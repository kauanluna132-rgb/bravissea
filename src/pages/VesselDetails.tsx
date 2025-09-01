import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Clock, Star, MapPin, Waves, Coffee, Music, Sun, Shield, Anchor, Zap, Box, Monitor, Smartphone, Droplets, Sparkles, Fuel, CheckCircle, Plus, AlertTriangle, Award, Bed as BedIcon, ChefHat } from "lucide-react";
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
    images: [
      "/lovable-uploads/030db542-183e-4ed7-bb19-0a6cd334cdb5.png",
      "/lovable-uploads/d9a6c9b9-9fee-4e01-994c-ebe3035b166d.png",
      "/lovable-uploads/88d5840c-c694-469c-b0b6-ebd172700c69.png",
      "/lovable-uploads/266900b9-42c7-4b08-a0cd-c9cb1755d25e.png",
      "/lovable-uploads/8ae1039c-db06-4d08-9021-8bdb576806e4.png",
      "/lovable-uploads/5f54c9a8-1d11-43f6-b5fd-d5b2121a0144.png",
      "/lovable-uploads/6db08f7a-905e-46d7-96a2-9854a88f7b02.png"
    ],
    capacity: 13,
    price: "R$ 2.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "LADY RUTH | 13 PASSAGEIROS - 5 horas de um excelente passeio com equipamentos premium",
    category: "lancha",
    
    // Especificações Técnicas
    specs: {
      type: "Lancha Premium",
      capacity: "13 passageiros",
      duration: "5 horas",
      departure: "Marina da Glória - RJ"
    },
    
    // Comodidades
    amenities: [
      "Combustível incluso",
      "Marinheiro profissional",
      "Tapetão flutuante",
      "Prancha Stand Up"
    ],
    
    // Inclusos no Passeio
    included: [
      "5 horas de um excelente passeio",
      "Combustível",
      "Marinheiro",
      "Tapetão Flutuante",
      "Prancha Stand Up"
    ],
    
    // Roteiros Disponíveis
    itineraries: [
      { 
        name: "Roteiro 1: Marina da Glória x Flamengo x Botafogo x Mureta da Urca", 
        price: "R$ 2.500,00",
        description: "Passeio completo pelos pontos mais icônicos da Baía de Guanabara"
      },
      { 
        name: "Roteiro 2: Marina da Glória x Flamengo x Botafogo x Mureta da Urca x Praia Vermelha", 
        price: "R$ 2.900,00",
        description: "Roteiro estendido incluindo a paradisíaca Praia Vermelha"
      }
    ],
    
    // Observações
    observations: [
      "Todos os roteiros incluem passagem pelos pontos turísticos principais",
      "Possibilidade de personalização do roteiro conforme solicitação",
      "Equipamentos de segurança inclusos",
      "Experiência premium garantida"
    ]
  },
  mangata: {
    id: "mangata",
    name: "MANGATA",
    type: "Catamarã Premium",
    images: [
      "/lovable-uploads/924e7658-9396-476b-8c54-f5eecf84cb9f.png",
      "/lovable-uploads/573e02ed-2755-4218-b4ae-59587be20f1f.png",
      "/lovable-uploads/9b466995-31e9-4a1a-919b-21fdcce224a2.png",
      "/lovable-uploads/a4f88006-70b1-4a04-9d57-28bfa10151de.png",
      "/lovable-uploads/9c5ccfa3-1cfa-4459-8a1e-73d1f1d39b52.png",
      "/lovable-uploads/c26f0a9f-f83b-49ec-936f-772e609da02e.png",
      "/lovable-uploads/794f66a3-fe29-46b6-ab32-9d36ceee92af.png",
      "/lovable-uploads/0c739ce3-f5bc-485d-b661-807f20a0c958.png"
    ],
    capacity: 30,
    price: "R$ 6.200",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "MANGATA - Catamarã premium com amplos espaços e comfort excepcional para até 30 passageiros",
    category: "catamara",
    
    // Especificações Técnicas
    specs: {
      type: "Catamarã Premium",
      length: "46 pés",
      capacity: "30 passageiros",
      duration: "6 horas",
      departure: "Marina da Glória - RJ"
    },
    
    // Comodidades e Características
    amenities: [
      "Área espaçosa com múltiplos níveis",
      "Solarium amplo para relaxamento",
      "Lounge climatizado",
      "Decks panorâmicos",
      "Design moderno e sofisticado",
      "Iluminação sofisticada",
      "Capacidade para 30 convidados",
      "Marinheiro profissional",
      "Passeio de 6 horas",
      "Seguro náutico",
      "Combustível incluso"
    ],
    
    // Inclusos no Passeio
    included: [
      "Marinheiro profissional",
      "Passeio de 6 horas",
      "Seguro náutico",
      "Combustível"
    ],
    
    // Serviços Adicionais
    additionalServices: [
      {
        service: "Passageiros extras",
        price: "R$ 1.500,00",
        description: "Valor por passageiro adicional"
      },
      {
        service: "Finger Food",
        price: "Consultar",
        description: "Opções de finger food disponíveis"
      },
      {
        service: "Barbecue Experience", 
        price: "R$ 1.500,00",
        description: "Experiência de churrasco - Valor: R$ 1.500 por pessoa. Incluso: Cerveja e Drinks"
      }
    ],
    
    // Roteiros Disponíveis
    itineraries: [
      {
        name: "Roteiro Urca",
        price: "R$ 6.200,00",
        description: "Passeio pela região da Urca com vistas deslumbrantes"
      }
    ]
  },
  prestige: {
    id: "prestige",
    name: "PRESTIGE",
    type: "Iate Prestige 42",
    images: [
      "/lovable-uploads/7c580f4c-ea10-4abc-804c-6ef4081f3a6e.png",
      "/lovable-uploads/5533ccfe-73f1-4e38-a910-b70a71adb094.png",
      "/lovable-uploads/8131796c-d7a3-477b-89a6-60494d308e84.png",
      "/lovable-uploads/ce6010dd-9d14-4611-a976-9b8a0c6da58b.png",
      "/lovable-uploads/6c8c5d8f-8985-40ad-aedd-99f6b60b1951.png",
      "/lovable-uploads/3b470483-9e56-47e2-830a-41959e242096.png",
      "/lovable-uploads/b08d133a-7b0d-4dcb-951d-45b3c561eb8e.png",
      "/lovable-uploads/cf856525-328b-4f76-8889-9925830ac08b.png",
      "/lovable-uploads/7322c1ba-e0c3-4f27-be58-1af0b49e4beb.png",
      "/lovable-uploads/0e8ef52a-4cbd-4c90-8602-90019c49b129.png"
    ],
    capacity: 15,
    price: "R$ 4.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "PRESTIGE - Iate Prestige 42 com design elegante e equipamentos de primeira linha",
    category: "iate",
    
    // Especificações Técnicas
    specs: {
      type: "Iate Prestige 42",
      capacity: "15 passageiros",
      duration: "5 horas",
      departure: "Marina da Glória - RJ"
    },
    
    // Comodidades
    amenities: [
      "Design elegante e moderno",
      "Cabine principal espaçosa",
      "Área de estar confortável",
      "Cozinha equipada",
      "Banheiro completo",
      "Sistema de som premium",
      "Deck para relaxamento",
      "Equipamentos de segurança",
      "Combustível incluso",
      "Marinheiro experiente"
    ],
    
    // Inclusos no Passeio
    included: [
      "Combustível",
      "Marinheiro experiente",
      "5 horas de passeio",
      "Equipamentos de segurança",
      "Seguro náutico"
    ],
    
    // Roteiros e Preços
    itineraries: [
      {
        name: "Roteiro Básico - Baía de Guanabara",
        price: "R$ 4.500,00",
        description: "Passeio completo pela Baía de Guanabara"
      },
      {
        name: "Roteiro Premium - Urca e Adjacências",
        price: "R$ 5.200,00", 
        description: "Roteiro estendido incluindo região da Urca"
      }
    ]
  },
  rebeca: {
    id: "rebeca",
    name: "REBECA",
    type: "Iate Executivo",
    images: [
      "/lovable-uploads/37d8fc0a-3dca-4800-8ea3-a120ba77fd6c.png",
      "/lovable-uploads/3832d73c-794a-4764-a803-24aa026cb108.png",
      "/lovable-uploads/37823d8f-2d16-402c-8a0a-cfbaacd8c14d.png",
      "/lovable-uploads/71b743d5-77eb-483f-aa1a-11aa91816205.png",
      "/lovable-uploads/971d60d5-6cd7-46b1-80e0-b22fc9971ecf.png",
      "/lovable-uploads/4a4ec402-ae85-44e6-8c3f-9cc24d90ec61.png",
      "/lovable-uploads/67f82209-8ce4-40b3-a168-8e083dfe39ac.png",
      "/lovable-uploads/fd531e0d-a5e6-4d20-a1c0-9f8d20807efe.png",
      "/lovable-uploads/87821562-8761-4226-8364-6d7a846d5dda.png",
      "/lovable-uploads/2d8ff364-27b0-4048-99fa-10922bf350ba.png"
    ],
    capacity: 20,
    price: "R$ 8.500",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "REBECA - Iate executivo de luxo com acabamentos premium e serviços diferenciados",
    category: "iate",
    
    // Especificações Técnicas
    specs: {
      type: "Iate Executivo",
      capacity: "20 passageiros",
      duration: "6 horas",
      departure: "Marina da Glória - RJ",
      category: "Luxo Executivo"
    },
    
    // Comodidades Premium
    amenities: [
      "Acabamentos de luxo",
      "Suíte principal com ar condicionado",
      "Sala de estar executiva",
      "Cozinha gourmet equipada",
      "Bar integrado",
      "Sistema de som e entretenimento",
      "Deck premium com solarium",
      "Banheiros de primeira linha",
      "Área de jantar sofisticada",
      "Equipamentos náuticos profissionais"
    ],
    
    // Inclusos no Pacote
    included: [
      "Combustível premium",
      "Comandante experiente",
      "6 horas de navegação",
      "Seguro náutico completo",
      "Limpeza e manutenção",
      "Equipamentos de segurança certificados"
    ],
    
    // Roteiros Executivos
    itineraries: [
      {
        name: "Roteiro Executivo VIP",
        price: "R$ 8.500,00",
        description: "Experiência completa de luxo pela Baía de Guanabara"
      },
      {
        name: "Roteiro Premium Estendido",
        price: "R$ 10.500,00",
        description: "Roteiro personalizado com paradas exclusivas"
      }
    ],
    
    // Serviços Adicionais
    additionalServices: [
      {
        service: "Catering Gourmet",
        price: "Sob consulta",
        description: "Serviço de alimentação gourmet personalizado"
      },
      {
        service: "Hostess Profissional",
        price: "R$ 800,00",
        description: "Acompanhamento de hostess durante o passeio"
      }
    ]
  },
  oceano: {
    id: "oceano",
    name: "OCEANO",
    type: "Catamarã",
    images: [
      "/lovable-uploads/56562047-b47a-4a19-a6cd-ca765e9bae68.png",
      "/lovable-uploads/9c5a4b56-9abb-4097-8827-72ac3267e3d8.png",
      "/lovable-uploads/8e8c7ca9-eb50-4a92-8e06-cbcc8616d15c.png",
      "/lovable-uploads/4aaeb7d8-8a8f-47c5-81d7-d1cffeac9b1f.png",
      "/lovable-uploads/031603c-0fb7-450a-9aa2-8f47c4fbe235.png",
      "/lovable-uploads/8ce2e68b-6ed0-47b8-9f7b-df5ab588c7d2.png",
      "/lovable-uploads/8e04365e-545e-47e3-a14d-2cf6b644e2f4.png",
      "/lovable-uploads/88594a2b-10de-4896-ab88-9412866aa0fa.png"
    ],
    capacity: 35,
    price: "R$ 7.500",
    rating: 4.8,
    duration: "6h",
    location: "Marina da Glória",
    description: "OCEANO - Catamarã espaçoso ideal para grupos grandes com excelente estabilidade",
    category: "catamara",
    
    // Especificações Técnicas
    specs: {
      type: "Catamarã",
      capacity: "35 passageiros",
      duration: "6 horas",
      departure: "Marina da Glória - RJ"
    },
    
    // Características do Catamarã
    amenities: [
      "Amplo deck superior",
      "Área coberta climatizada",
      "Múltiplas áreas de relaxamento",
      "Excelente estabilidade",
      "Vista panorâmica 360°",
      "Área de solarium",
      "Sistema de som ambiente",
      "Banheiros amplos",
      "Cozinha equipada",
      "Capacidade para grandes grupos"
    ],
    
    // Inclusos no Passeio
    included: [
      "Combustível",
      "Marinheiro profissional",
      "6 horas de navegação",
      "Seguro náutico",
      "Equipamentos de segurança",
      "Limpeza da embarcação"
    ],
    
    // Opções de Roteiro
    itineraries: [
      {
        name: "Roteiro Baía de Guanabara",
        price: "R$ 7.500,00",
        description: "Passeio completo pela Baía de Guanabara"
      },
      {
        name: "Roteiro Especial Grupos",
        price: "R$ 8.500,00",
        description: "Roteiro personalizado para grupos grandes"
      }
    ]
  },
  blau: {
    id: "blau",
    name: "BLAU",
    type: "Catamarã",
    images: [
      "/lovable-uploads/801c9b39-27b8-4d39-b8aa-a171e0173460.png",
      "/lovable-uploads/55828aaa-059f-4efd-88ec-d8f9ac9c138a.png",
      "/lovable-uploads/81555da6-30a6-4286-b4e9-f39844b74db8.png",
      "/lovable-uploads/5fb2c34b-d3b5-457d-bc6a-d39fcf8d281f.png",
      "/lovable-uploads/9811b275-cdf5-422e-adce-19e83e5c4d45.png",
      "/lovable-uploads/835760af-9ec1-442f-91d6-4aa2ce55415d.png",
      "/lovable-uploads/5f810146-e5c7-4dbb-a4d8-2c19d4ed864c.png",
      "/lovable-uploads/f445fc67-3320-4ec8-9fb4-242ae592d18c.png"
    ],
    capacity: 30,
    price: "R$ 6.800",
    rating: 4.7,
    duration: "6h",
    location: "Marina da Glória",
    description: "BLAU - Catamarã moderno com design contemporâneo e áreas amplas para relaxamento",
    category: "catamara",
    
    // Especificações Técnicas
    specs: {
      type: "Catamarã Moderno",
      capacity: "30 passageiros",
      duration: "6 horas",
      departure: "Marina da Glória - RJ"
    },
    
    // Características
    amenities: [
      "Design contemporâneo",
      "Áreas amplas e confortáveis",
      "Deck superior panorâmico",
      "Lounge interno climatizado",
      "Múltiplas áreas de descanso",
      "Sistema de som moderno",
      "Bar integrado",
      "Banheiros modernos",
      "Área gourmet",
      "Excelente para eventos"
    ],
    
    // Inclusos
    included: [
      "Combustível",
      "Comandante experiente",
      "6 horas de passeio",
      "Seguro náutico",
      "Equipamentos de segurança",
      "Limpeza"
    ],
    
    // Roteiros
    itineraries: [
      {
        name: "Roteiro Premium",
        price: "R$ 6.800,00",
        description: "Passeio premium pela Baía de Guanabara"
      }
    ]
  },
  nossa: {
    id: "nossa",
    name: "YACHT CATAMARÃ ATLANTIS",
    type: "Catamarã 120 pés",
    images: [
      "/lovable-uploads/915a115f-06cd-4dae-a14b-eb03cbc20e7d.png",
      "/lovable-uploads/9f780e41-4856-4456-9fab-80487c0685eb.png",
      "/lovable-uploads/c5d5f157-e28f-4121-9f34-69f1caddf1d5.png",
      "/lovable-uploads/a2b629cd-b6ab-4130-9a2d-96729da50c69.png",
      "/lovable-uploads/99fbb3fe-f920-4c5d-9f3f-35e0b9d8774a.png",
      "/lovable-uploads/49db391e-eb94-424f-ad6e-eff2a493496c.png",
      "/lovable-uploads/71b743d5-77eb-483f-aa1a-11aa91816205.png",
      "/lovable-uploads/c3154822-ac51-4128-ac23-e5f9f76151b1.png",
      "/lovable-uploads/89402a3c-0e13-40f0-9956-49d4122bc96d.png",
      "/lovable-uploads/df483e11-a701-463a-8b0c-b1750bef604f.png"
    ],
    capacity: 100,
    price: "R$ 80.000",
    rating: 5.0,
    duration: "6h",
    location: "Marina da Glória",
    description: "YACHT CATAMARÃ ATLANTIS - O mais luxuoso catamarã de 120 pés com capacidade para 100 convidados",
    category: "catamara",
    
    // Especificações Técnicas
    specs: {
      type: "Catamarã 120 pés",
      basePrice: "R$ 80.000,00",
      duration: "6 horas",
      capacity: "100 convidados",
      extraPassengers: "R$ 1.500,00 por passageiro a mais",
      route: "Urca"
    },
    
    // Comodidades Premium
    amenities: [
      "Áreas espaçosas com múltiplos níveis",
      "Solarium amplo para relaxamento",
      "Lounge climatizado de luxo",
      "Decks panorâmicos",
      "Design moderno e sofisticado",
      "Iluminação sofisticada LED",
      "Capacidade para 100 convidados",
      "Múltiplas áreas de entretenimento"
    ],
    
    // Inclusos no Passeio
    included: [
      "Marinheiro profissional",
      "Passeio de 6 horas",
      "Seguro náutico completo",
      "Combustível premium"
    ],
    
    // Serviços Adicionais
    additionalServices: [
      {
        service: "Passageiros extras",
        price: "R$ 1.500,00",
        description: "Valor por passageiro adicional acima da capacidade base"
      },
      {
        service: "Finger Food",
        price: "Consultar",
        description: "Opções variadas de finger foods gourmet"
      },
      {
        service: "Barbecue Experience",
        price: "R$ 1.500,00 por pessoa",
        description: "Experiência completa de churrasco. Incluso: Cerveja premium e drinks especiais"
      }
    ]
  },
  seven: {
    id: "seven",
    name: "SEVEN",
    type: "Iate Premium",
    images: [
      "/lovable-uploads/729365c1-b3c2-4db7-8b9d-931a2f7fb1f7.png",
      "/lovable-uploads/758a21a0-0f35-4d63-8802-bf9fb5543f54.png",
      "/lovable-uploads/79cf6208-ce19-4ffe-85c4-6cc5c03d60e0.png",
      "/lovable-uploads/841e3f14-5cac-42b4-8107-39b6439229f0.png",
      "/lovable-uploads/87793615-17b2-46cd-83e8-f0060a012b57.png",
      "/lovable-uploads/913026d2-eeeb-4ff0-94b3-5c8e7fb90adb.png",
      "/lovable-uploads/2c53acee-78b6-45f0-9cfc-3e2fda51d15f.png",
      "/lovable-uploads/613c8065-c109-4371-8b70-a14cdc1634ab.png",
      "/lovable-uploads/f29c9b99-1624-4a05-a608-82a9c3a46f5e.png",
      "/lovable-uploads/7c0d8ffc-ec95-4679-998a-9ee8c583087e.png"
    ],
    capacity: 25,
    price: "R$ 9.500",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "SEVEN - Iate premium de luxo com acabamentos sofisticados e serviços exclusivos",
    category: "iate",
    
    specs: {
      type: "Iate Premium",
      capacity: "25 passageiros",
      duration: "6 horas",
      departure: "Marina da Glória - RJ"
    },
    
    amenities: [
      "Acabamentos de luxo",
      "Suítes climatizadas",
      "Área gourmet completa",
      "Bar premium",
      "Sistema de entretenimento",
      "Deck panorâmico",
      "Solarium de luxo",
      "Banheiros premium",
      "Cozinha gourmet",
      "Área VIP"
    ],
    
    included: [
      "Combustível premium",
      "Comandante especializado",
      "6 horas de navegação",
      "Seguro náutico VIP",
      "Equipamentos de primeira linha",
      "Serviço de limpeza"
    ],
    
    itineraries: [
      {
        name: "Roteiro VIP Premium",
        price: "R$ 9.500,00",
        description: "Experiência VIP completa com paradas exclusivas"
      }
    ]
  },
  senna: {
    id: "senna",
    name: "SENNA",
    type: "Iate Esportivo",
    images: [
      "/lovable-uploads/2c51654c-c654-47ab-a790-6535d71a42cd.png",
      "/lovable-uploads/2e6b1dea-bd55-448e-b56a-417204d37f78.png",
      "/lovable-uploads/2fe01d15-281c-4460-bb7b-16f136ed1c04.png",
      "/lovable-uploads/31824218-deb4-4ca4-8dba-6b7ff28592ab.png",
      "/lovable-uploads/3ae1ccf8-33be-4386-9ddc-94def815ae84.png",
      "/lovable-uploads/3dd1c35b-81c4-4a09-85cd-8cd136cac6b0.png",
      "/lovable-uploads/3e2e65a7-195a-4f5e-9cf9-39c176c713cd.png",
      "/lovable-uploads/4030871f-68fb-4740-bcd7-a365279c5ee2.png",
      "/lovable-uploads/44323201-dca2-4c5f-ad47-833a22a0162c.png",
      "/lovable-uploads/469716cc-1617-43e4-bb71-3e407cbe189b.png"
    ],
    capacity: 18,
    price: "R$ 7.200",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "SENNA - Iate esportivo com design arrojado e performance excepcional",
    category: "iate",
    
    specs: {
      type: "Iate Esportivo",
      capacity: "18 passageiros",
      duration: "5 horas",
      departure: "Marina da Glória - RJ"
    },
    
    amenities: [
      "Design esportivo",
      "Performance alta velocidade",
      "Cabine moderna",
      "Sistema de som premium",
      "Área de descanso",
      "Banheiro completo",
      "Cozinha equipada",
      "Deck esportivo",
      "Equipamentos modernos",
      "Conforto premium"
    ],
    
    included: [
      "Combustível",
      "Comandante experiente",
      "5 horas de passeio",
      "Seguro náutico",
      "Equipamentos de segurança",
      "Limpeza"
    ],
    
    itineraries: [
      {
        name: "Roteiro Esportivo",
        price: "R$ 7.200,00",
        description: "Passeio dinâmico pela Baía de Guanabara"
      }
    ]
  },
  luisa: {
    id: "luisa",
    name: "LUÍSA",
    type: "Iate Clássico",
    images: [
      "/lovable-uploads/0dfb6b55-abba-46ad-b2ca-4089832dae35.png",
      "/lovable-uploads/0896ea4c-40a0-4ed6-8f39-e5d9a16ce6ce.png",
      "/lovable-uploads/0953df0c-2627-4cce-986e-0a23651b3b33.png",
      "/lovable-uploads/08097703-3ae1-4432-8fe4-5092bda148ef.png",
      "/lovable-uploads/03c21177-517e-46bb-ba14-3d5e3e92b548.png",
      "/lovable-uploads/04916aad-37e7-4b88-8cd2-b80513033416.png",
      "/lovable-uploads/12450aa9-b646-4ad7-8de4-38fb91bc6480.png",
      "/lovable-uploads/147de007-1602-410f-8662-c8a62f840359.png",
      "/lovable-uploads/15303440-1cc6-4b35-90c6-aadc5d3e0e34.png",
      "/lovable-uploads/1741780f-1cda-4856-a568-6004932119ad.png"
    ],
    capacity: 16,
    price: "R$ 5.800",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "LUÍSA - Iate clássico com charme tradicional e elegância atemporal",
    category: "iate",
    
    specs: {
      type: "Iate Clássico",
      capacity: "16 passageiros",
      duration: "5 horas",
      departure: "Marina da Glória - RJ"
    },
    
    amenities: [
      "Design clássico elegante",
      "Acabamentos em madeira",
      "Cabine tradicional",
      "Área de estar aconchegante",
      "Cozinha tradicional",
      "Banheiro clássico",
      "Deck tradicional",
      "Charme vintage",
      "Conforto tradicional",
      "Atmosfera acolhedora"
    ],
    
    included: [
      "Combustível",
      "Marinheiro tradicional",
      "5 horas de passeio",
      "Seguro náutico",
      "Equipamentos clássicos",
      "Manutenção"
    ],
    
    itineraries: [
      {
        name: "Roteiro Clássico",
        price: "R$ 5.800,00",
        description: "Passeio tradicional pela Baía de Guanabara"
      }
    ]
  }
};

const VesselDetails = () => {
  const { vesselId } = useParams();
  const navigate = useNavigate();
  const vessel = vesselsData[vesselId as keyof typeof vesselsData];

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '',
    route: '',
    message: ''
  });

  if (!vessel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Embarcação não encontrada</h1>
          <Button onClick={() => navigate('/')}>Voltar ao Catálogo</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBooking = () => {
    const message = `
Olá! Gostaria de fazer uma reserva para a embarcação ${vessel.name}.

*Detalhes da Reserva:*
Nome: ${bookingForm.name}
Telefone: ${bookingForm.phone}
Data: ${bookingForm.date}
Número de passageiros: ${bookingForm.guests}
Roteiro: ${bookingForm.route}
Mensagem: ${bookingForm.message || 'Nenhuma observação adicional'}

Aguardo retorno para confirmação e mais detalhes.
    `.trim();

    const whatsappUrl = `https://wa.me/5521999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <main className="min-h-screen bg-background">
        <div className="w-full px-2 sm:px-4 py-2 sm:py-4 max-w-none overflow-x-hidden">
          {/* Header com voltar */}
          <div className="flex items-center mb-3 sm:mb-4 max-w-7xl mx-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="mr-2 p-1 sm:p-2 flex-shrink-0"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Voltar
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold truncate">{vessel.name}</h1>
              <Badge variant="secondary" className="text-xs mt-1">{vessel.type}</Badge>
            </div>
          </div>

          {/* Grid principal */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
            {/* Coluna esquerda - Imagens e informações principais */}
            <div className="w-full lg:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Carousel de imagens */}
              <div className="bg-card rounded-lg overflow-hidden shadow-lg w-full">
                <VesselImageCarousel images={vessel.images || []} vesselName={vessel.name} />
              </div>

              {/* Informações básicas */}
              <Card className="shadow-lg w-full">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
                    <div className="text-center p-1 sm:p-2 bg-primary/5 rounded-lg">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium">{vessel.capacity}</p>
                      <p className="text-xs text-muted-foreground">pessoas</p>
                    </div>
                    <div className="text-center p-1 sm:p-2 bg-primary/5 rounded-lg">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium">{vessel.duration}</p>
                    </div>
                    <div className="text-center p-1 sm:p-2 bg-primary/5 rounded-lg">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium">{vessel.rating}</p>
                    </div>
                    <div className="text-center p-1 sm:p-2 bg-primary/5 rounded-lg">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium">Marina</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">{vessel.description}</p>
                </CardContent>
              </Card>

              {/* Especificações Técnicas */}
              {(vessel as any).specs && (
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Anchor className="h-5 w-5 text-primary" />
                      Especificações Técnicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries((vessel as any).specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                          <span className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <span className="text-sm text-muted-foreground">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comodidades */}
              {(vessel as any).amenities && (
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Comodidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(vessel as any).amenities.map((amenity: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Inclusos no Passeio */}
              {(vessel as any).included && (
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Inclusos no Passeio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(vessel as any).included.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Roteiros e Destinos */}
              {((vessel as any).destinations || (vessel as any).itineraries || (vessel as any).routes) && (
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Roteiros Disponíveis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {((vessel as any).destinations || (vessel as any).itineraries || (vessel as any).routes)?.map((route: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-primary/5">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">{route.name}</h4>
                            <span className="text-primary font-bold text-sm">{route.price}</span>
                          </div>
                          {route.description && (
                            <p className="text-xs text-muted-foreground">{route.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Serviços Adicionais */}
              {((vessel as any).additionalFees || (vessel as any).additionalServices) && (
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Plus className="h-5 w-5 text-primary" />
                      Serviços Adicionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {((vessel as any).additionalFees || (vessel as any).additionalServices)?.map((service: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">{service.service}</h4>
                            <span className="text-primary font-bold text-sm">{service.price}</span>
                          </div>
                          {service.description && (
                            <p className="text-xs text-muted-foreground">{service.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Horários */}
              {(vessel as any).schedule && (
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Horários Disponíveis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries((vessel as any).schedule).map(([period, time]) => (
                        <div key={period} className="p-3 bg-primary/5 rounded-lg text-center">
                          <h4 className="font-medium text-sm capitalize mb-1">
                            {period === 'morning' ? 'Manhã' : 'Tarde'}
                          </h4>
                          <p className="text-sm text-primary font-bold">{String(time)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Observações */}
              {(vessel as any).observations && (
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Observações Importantes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {(vessel as any).observations.map((obs: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{obs}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Coluna direita - Preços e reserva */}
            <div className="w-full space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Card de reserva */}
              <Card className="lg:sticky lg:top-4 shadow-lg w-full">
                <CardHeader className="pb-2 sm:pb-3 lg:pb-4 p-3 sm:p-4 lg:p-6">
                  <CardTitle className="text-xs sm:text-sm lg:text-base xl:text-lg">Faça sua Reserva</CardTitle>
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-primary">{vessel.price}</span>
                    <span className="text-xs text-muted-foreground">/passeio</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 lg:space-y-4 p-3 sm:p-4 lg:p-6">
                  <div>
                    <Label htmlFor="name" className="text-xs">Nome completo</Label>
                    <Input 
                      id="name"
                      value={bookingForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome"
                      className="text-xs h-8"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-xs">WhatsApp</Label>
                    <Input 
                      id="phone"
                      value={bookingForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(21) 99999-9999"
                      className="text-xs h-8"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date" className="text-xs">Data do passeio</Label>
                    <Input 
                      id="date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="text-xs h-8"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="guests" className="text-xs">Número de passageiros</Label>
                    <Select onValueChange={(value) => handleInputChange('guests', value)}>
                      <SelectTrigger className="h-8 text-xs">
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
                    <Label htmlFor="route" className="text-xs">Roteiro desejado</Label>
                    <Select onValueChange={(value) => handleInputChange('route', value)}>
                      <SelectTrigger className="h-8 text-xs">
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
                    <Label htmlFor="message" className="text-xs">Mensagem (opcional)</Label>
                    <Textarea 
                      id="message"
                      value={bookingForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Alguma solicitação especial?"
                      rows={2}
                      className="text-xs resize-none"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-primary hover:bg-primary-dark text-xs py-2"
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

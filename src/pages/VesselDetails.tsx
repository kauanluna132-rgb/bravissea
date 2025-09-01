import { useState, useEffect } from "react";
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
    
    // Serviços Adicionais
    additionalServices: [
      { service: "Taxa do Churrasqueiro", price: "R$ 200,00" },
      { service: "Taxa de Embarque", price: "R$ 200,00" }
    ]
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
    name: "IATE PRESTIGE 60 PÉS",
    type: "Iate de Luxo",
    images: [
      "/lovable-uploads/a4f88006-70b1-4a04-9d57-28bfa10151de.png",
      "/lovable-uploads/6cf377ab-a937-4fe3-ac92-9095dba56157.png",
      "/lovable-uploads/7165fe57-2b4a-455a-ae95-3149e6e3b7df.png",
      "/lovable-uploads/73ec5552-0181-4d19-b75d-2a24057c3735.png",
      "/lovable-uploads/fa35a6dd-ee47-4ad7-8102-d37f9922d687.png",
      "/lovable-uploads/15303440-1cc6-4b35-90c6-aadc5d3e0e34.png",
      "/lovable-uploads/6b669433-863d-478c-9b9a-ad488e7b6b61.png",
      "/lovable-uploads/50a08687-a27e-4702-bb79-7fe91990bf02.png",
      "/lovable-uploads/2c51654c-c654-47ab-a790-6535d71a42cd.png",
      "/lovable-uploads/88594a2b-10de-4896-ab88-9412866aa0fa.png"
    ],
    capacity: 20,
    price: "R$ 20.000",
    rating: 5.0,
    duration: "6h",
    location: "Marina da Glória",
    description: "Iate de luxo Prestige 60 pés com máximo conforto e elegância para sua experiência única no mar.",
    
    // Especificações Técnicas
    specs: {
      price: "R$ 20.000,00",
      duration: "6 horas",
      motorization: "Dois motores Volvo D13",
      capacity: "Até 20 pessoas"
    },

    // Acomodações
    accommodations: [
      "1 suíte",
      "1 cabine de solteiro (conversível para casal)",
      "1 cabine de proa com banheiro social"
    ],

    // Cozinha Completa
    kitchen: [
      "2 geladeiras",
      "Mini freezer",
      "Micro-ondas",
      "Fogão elétrico"
    ],

    // Conforto e Comodidades
    comfort: [
      "Sala espaçosa com dois sofás",
      "Armários nos quartos e na sala",
      "Água quente em todas as torneiras",
      "Gerador de 15 KVA",
      "Máquina de gelo",
      "Som Bluetooth com automação independente"
    ],

    // Flybridge
    flybridge: [
      "Pia",
      "Churrasqueira elétrica"
    ],

    category: "iate"
  },
  rebeca: {
    id: "rebeca",
    name: "YACHT REBECA",
    type: "Iate Luxury",
    images: [
      "/lovable-uploads/f29c9b99-1624-4a05-a608-82a9c3a46f5e.png",
      "/lovable-uploads/37d8fc0a-3dca-4800-8ea3-a120ba77fd6c.png",
      "/lovable-uploads/e2c9c31d-7a16-4dd1-b3c3-27083fed6d7a.png",
      "/lovable-uploads/642a623e-b8b9-43fa-b668-9788940208a1.png",
      "/lovable-uploads/260e64f1-d533-416d-a9a3-553ef2bc58f1.png",
      "/lovable-uploads/d73b8c23-47c6-4e6f-a37c-bc753b9b9a2a.png",
      "/lovable-uploads/a0d6795e-3c20-45cb-9f90-29bd99912ab9.png",
      "/lovable-uploads/cf856525-328b-4f76-8889-9925830ac08b.png",
      "/lovable-uploads/87821562-8761-4226-8364-6d7a846d5dda.png"
    ],
    capacity: 16,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    description: "Phantom 620 Pininfarina de 62 pés com design assinado pelo estúdio italiano responsável por Ferrari e Maserati",
    category: "iate",
    specifications: {
      model: "Phantom 620 Pininfarina",
      length: "62 pés", 
      capacity: "16 passageiros",
      overnight: "Até 7 passageiros",
      duration: "6 horas",
      departure: "Marina da Glória"
    },
    amenities: [
      "Espaço de convivência",
      "Cabines e quartos", 
      "Banheiros completos",
      "Sala de jantar",
      "Cozinha completa",
      "Amplo cockpit",
      "Solário na proa com duas opções",
      "Cozinha gourmet na plataforma",
      "Fly-bridge espaçoso",
      "Design interno Pininfarina"
    ],
    included: [
      "Combustível",
      "Marinheiro profissional",
      "Passeio de 6 horas",
      "Seguro da embarcação"
    ],
    additionalServices: [
      { name: "Serviço de Barman", price: "Não incluso", required: false },
      { name: "Churrasqueiro", price: "Não incluso", required: false },
      { name: "Catering personalizado", price: "Sob consulta", required: false }
    ]
  },
  oceano: {
    id: "oceano",
    name: "OCEANO",
    type: "Catamarã",
    images: [
      "/lovable-uploads/2402bb41-ddc9-4cfa-96e5-b21a00722ecb.png",
      "/lovable-uploads/b08d133a-7b0d-4dcb-951d-45b3c561eb8e.png",
      "/lovable-uploads/cc1ce7a4-f296-4701-812e-353e93d07867.png",
      "/lovable-uploads/0953df0c-2627-4cce-986e-0a23651b3b33.png",
      "/lovable-uploads/4f85c8f6-1bbc-481f-8f43-624e5c4cfb7b.png",
      "/lovable-uploads/7c0d8ffc-ec95-4679-998a-9ee8c583087e.png",
      "/lovable-uploads/5d9146e9-e131-4187-9156-a083126176d8.png",
      "/lovable-uploads/31824218-deb4-4ca4-8dba-6b7ff28592ab.png"
    ],
    capacity: 65,
    price: "R$ 16.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã OCEANO | 65 PASSAGEIROS - Período de 5hrs - Roteiro interno com horários válidos por 30 dias",
    category: "catamara",
    specs: {
      type: "Catamarã",
      capacity: "até 65 passageiros",
      duration: "5 horas - Roteiro interno",
      boarding: "Marina da Glória",
      validity: "30 dias"
    },
    schedule: {
      morning: "10h às 15h",
      afternoon: "16h às 21h",
      night: "a combinar"
    },
    amenities: [
      "Bar Oceano com iluminação LED",
      "Área lounge com sofás",
      "Cozinha completa equipada",
      "Deck superior com vista panorâmica",
      "Área de churrasqueira",
      "Grama sintética",
      "Som ambiente"
    ],
    included: [
      "Marinheiro",
      "Combustível"
    ],
    pricing: {
      up50: "R$ 16.000",
      up65: "R$ 18.000"
    },
    additionalServices: [
      { service: "Churrasqueiro", price: "R$ 600" },
      { service: "Barman", price: "R$ 600" },
      { service: "Guarda-vidas", price: "R$ 400", note: "obrigatório para mergulho" },
      { service: "Roteiro externo (Itaipu/Cagarras)", price: "R$ 5.000" },
      { service: "Hora extra", price: "R$ 3.200/hora" },
      { service: "Serviço de Buffet/decoração", price: "a combinar" }
    ],
    notes: [
      "Roteiro externo limitado a 50 passageiros",
      "Eventos especiais: roteiro Urca, Praia do Morcego e Adão e Eva",
      "Por questão de segurança somente nosso churrasqueiro está autorizado a preparar o churrasco",
      "Roteiro externo é obrigatório a presença do guarda-vidas"
    ]
  },
  blau: {
    id: "blau",
    name: "CATAMARÃ BLAU",
    type: "Catamarã",
    images: [
      "/lovable-uploads/da67be76-ac24-4269-aead-b242639fa0a3.png",
      "/lovable-uploads/9811b275-cdf5-422e-adce-19e83e5c4d45.png",
      "/lovable-uploads/d88ff8fb-9e94-47f9-8f78-e61e8272618d.png",
      "/lovable-uploads/801c9b39-27b8-4d39-b8aa-a171e0173460.png",
      "/lovable-uploads/12450aa9-b646-4ad7-8de4-38fb91bc6480.png",
      "/lovable-uploads/81555da6-30a6-4286-b4e9-f39844b74db8.png",
      "/lovable-uploads/62a4a4ee-7b72-4365-86a2-b870cd9a3b67.png",
      "/lovable-uploads/08097703-3ae1-4432-8fe4-5092bda148ef.png",
      "/lovable-uploads/5533ccfe-73f1-4e38-a910-b70a71adb094.png",
      "/lovable-uploads/2c53acee-78b6-45f0-9cfc-3e2fda51d15f.png"
    ],
    capacity: 20,
    price: "R$ 8.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    description: "Catamarã BLAU com capacidade para 20 passageiros, ideal para passeios em família",
    category: "catamara",
    specifications: {
      type: "Catamarã",
      capacity: "20 passageiros",
      duration: "5 horas",
      departure: "Marina da Glória"
    },
    amenities: [
      "Salão interno espaçoso",
      "Área externa ampla",
      "Banheiros completos",
      "Cozinha equipada",
      "Área de descanso",
      "Solário",
      "Sistema de som",
      "Área para refeições"
    ],
    included: [
      "Marinheiro profissional",
      "Churrasqueiro",
      "Combustível",
      "Passeio de 5 horas"
    ],
    itineraries: [
      { name: "Roteiro Padrão: Urca x Praia Vermelha", price: "R$ 8.000", description: "Roteiro clássico pela Urca e Praia Vermelha" },
      { name: "Roteiro Itaipu", price: "R$ 10.000", description: "Roteiro estendido para Itaipu (acréscimo R$ 2.000)" },
      { name: "Roteiro Cagarras", price: "R$ 10.000", description: "Roteiro estendido para Ilhas Cagarras (acréscimo R$ 2.000)" }
    ]
  },
  nossa: {
    id: "nossa",
    name: "YACHT CATAMARÃ ATLANTIS",
    type: "Catamarã Luxury 120 pés",
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
    capacity: 80,
    price: "R$ 80.000",
    rating: 5.0,
    duration: "6h",
    location: "Marina da Glória",
    description: "Catamarã de luxo de 120 pés para grandes eventos - capacidade para até 100 convidados",
    
    // Especificações Técnicas
    specifications: [
      { label: "Tipo", value: "Iate Catamarã de Luxo" },
      { label: "Tamanho", value: "120 pés" },
      { label: "Preço Base", value: "R$ 80.000,00" },
      { label: "Duração", value: "6 horas" },
      { label: "Capacidade", value: "80 passageiros (máx. 100)" },
      { label: "Passageiros Extras", value: "R$ 1.500,00 por pessoa" },
      { label: "Roteiro", value: "Urca" }
    ],
    
    // Comodidades
    amenities: [
      "Espaços amplos para grandes eventos",
      "Múltiplos níveis e áreas de convivência",
      "Área de solarium expansiva",
      "Salão interno climatizado",
      "Áreas de deck com vista panorâmica",
      "Estrutura para até 100 convidados",
      "Design moderno e elegante",
      "Iluminação ambiente sofisticada"
    ],
    
    // Inclusos
    inclusions: [
      "Marinheiro profissional",
      "Passeio de 6 horas",
      "Seguro náutico",
      "Combustível incluso"
    ],
    
    // Serviços Adicionais
    additionalServices: [
      "Finger Food: Consulte valores",
      "Barbecue Experience: R$ 1.500,00 por pessoa",
      "Experiência de churrasco completa",
      "Cerveja e drinks inclusos no BBQ",
      "Serviços de bordo personalizados"
    ],
    
    category: "catamara"
  },
  atlantis: {
    id: "atlantis",
    name: "YACHT CATAMARÃ ATLANTIS",
    type: "Catamarã Luxury 120 pés",
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
    capacity: 80,
    price: "R$ 80.000",
    rating: 5.0,
    duration: "6h",
    location: "Marina da Glória",
    description: "Catamarã de luxo de 120 pés para grandes eventos - capacidade para até 100 convidados",
    
    // Especificações Técnicas
    specifications: [
      { label: "Tipo", value: "Iate Catamarã de Luxo" },
      { label: "Tamanho", value: "120 pés" },
      { label: "Preço Base", value: "R$ 80.000,00" },
      { label: "Duração", value: "6 horas" },
      { label: "Capacidade", value: "80 passageiros (máx. 100)" },
      { label: "Passageiros Extras", value: "R$ 1.500,00 por pessoa" },
      { label: "Roteiro", value: "Urca" }
    ],
    
    // Comodidades
    amenities: [
      "Espaços amplos para grandes eventos",
      "Múltiplos níveis e áreas de convivência",
      "Área de solarium expansiva",
      "Salão interno climatizado",
      "Áreas de deck com vista panorâmica",
      "Estrutura para até 100 convidados",
      "Design moderno e elegante",
      "Iluminação ambiente sofisticada"
    ],
    
    // Inclusos
    inclusions: [
      "Marinheiro profissional",
      "Passeio de 6 horas",
      "Seguro náutico",
      "Combustível incluso"
    ],
    
    // Serviços Adicionais
    additionalServices: [
      "Finger Food: Consulte valores",
      "Barbecue Experience: R$ 1.500,00 por pessoa",
      "Experiência de churrasco completa",
      "Cerveja e drinks inclusos no BBQ",
      "Serviços de bordo personalizados"
    ],
    
    category: "catamara"
  },
  seven: {
    id: "seven",
    name: "SEVEN",
    type: "Lancha SEVEN Intermarine 44",
    images: [
      "/lovable-uploads/0e8ef52a-4cbd-4c90-8602-90019c49b129.png",
      "/lovable-uploads/79cf6208-ce19-4ffe-85c4-6cc5c03d60e0.png",
      "/lovable-uploads/a47c4b6e-8519-414d-8f7b-8b2cef4ac260.png",
      "/lovable-uploads/a8410def-d105-4c3e-acd4-8bff54b0c794.png",
      "/lovable-uploads/0c739ce3-f5bc-485d-b661-807f20a0c958.png",
      "/lovable-uploads/5ac3941d-a8c6-4e87-a719-657b70a3c01f.png",
      "/lovable-uploads/835760af-9ec1-442f-91d6-4aa2ce55415d.png",
      "/lovable-uploads/4aaeb7d8-8a8f-47c5-81d7-d1cffeac9b1f.png",
      "/lovable-uploads/4a4ec402-ae85-44e6-8c3f-9cc24d90ec61.png",
      "/lovable-uploads/ffe0d831-bee7-4a21-aa0a-a08b806d4699.png"
    ],
    capacity: 15,
    price: "R$ 7.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    description: "Lancha SEVEN Intermarine 44 com duração de 5 horas de passeio",
    specs: {
      model: "Lancha SEVEN Intermarine 44",
      capacity: "15 passageiros + 2 marinheiros",
      duration: "5 horas de passeio",
      boarding: "Marina da Glória"
    },
    amenities: [
      "Som Bluetooth",
      "Flutuadores para banho"
    ],
    inclusions: [
      "Combustível",
      "Marinheiro",
      "Som Bluetooth",
      "Flutuadores para banho"
    ],
    routes: [
      { name: "Roteiro Urca", price: "R$ 7.000" },
      { name: "Roteiro Praia Vermelha", price: "R$ 7.800" },
      { name: "Roteiro Ilha Cagarras", price: "R$ 8.900" }
    ],
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

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

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
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground mb-2 break-words">
                  {vessel.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-muted-foreground text-sm lg:text-base">
                  <Badge variant="outline" className="text-xs sm:text-sm">{vessel.type}</Badge>
                  <div className="flex items-center min-w-0">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{vessel.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 fill-current text-yellow-500 flex-shrink-0" />
                    <span>{vessel.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:mt-0 text-left lg:text-right flex-shrink-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary break-words">
                  {vessel.price}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">por dia</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 lg:py-12 w-full max-w-full overflow-hidden">
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-8 w-full max-w-full">
            {/* Galeria e Detalhes */}
            <div className="lg:col-span-2 min-w-0 max-w-full overflow-hidden">
              {/* Galeria com Carrossel */}
              <div className="mb-4 sm:mb-6 lg:mb-8 w-full overflow-hidden">
                <VesselImageCarousel
                  images={vessel.images}
                  vesselName={vessel.name}
                />
              </div>

              {/* Descrição Organizada */}
              <Card className="mb-6 lg:mb-8 w-full">
                <CardHeader>
                  <CardTitle>Sobre a {vessel.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <p className="text-muted-foreground mb-6 lg:mb-8 text-sm lg:text-lg leading-relaxed break-words hyphens-auto">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                          <div className="bg-muted/50 p-3 lg:p-4 rounded-lg">
                            <span className="font-medium text-xs lg:text-sm text-muted-foreground uppercase tracking-wide">Comprimento</span>
                            <p className="text-base lg:text-lg font-semibold break-words">58 Pés</p>
                          </div>
                          <div className="bg-muted/50 p-3 lg:p-4 rounded-lg">
                            <span className="font-medium text-xs lg:text-sm text-muted-foreground uppercase tracking-wide">Motores</span>
                            <p className="text-base lg:text-lg font-semibold break-words">2 x Volvo 950 IPS</p>
                          </div>
                          <div className="bg-muted/50 p-3 lg:p-4 rounded-lg">
                            <span className="font-medium text-xs lg:text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                            <p className="text-base lg:text-lg font-semibold break-words">{vessel.capacity} pessoas</p>
                          </div>
                          <div className="bg-muted/50 p-3 lg:p-4 rounded-lg">
                            <span className="font-medium text-xs lg:text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                            <p className="text-base lg:text-lg font-semibold break-words">{vessel.duration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Acomodações */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          Acomodações
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
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

                      {/* Informações específicas do SEVEN */}
                      {vessel.id === "seven" && (
                        <div className="space-y-6">
                          {/* Especificações Técnicas */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Anchor className="h-5 w-5 mr-2" />
                              Especificações Técnicas
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Modelo</span>
                                <p className="text-lg font-semibold mt-1">Lancha SEVEN Intermarine 44</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                                <p className="text-lg font-semibold mt-1">15 passageiros + 2 marinheiros</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                                <p className="text-lg font-semibold mt-1">5 horas de passeio</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Saída</span>
                                <p className="text-lg font-semibold mt-1">Marina da Glória</p>
                              </div>
                            </div>
                          </div>

                          {/* Comodidades */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Waves className="h-5 w-5 mr-2" />
                              Comodidades
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Music className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Som Bluetooth</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Waves className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Flutuadores para banho</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Incluso */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Incluso
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Fuel className="h-6 w-6 text-green-600 mr-3" />
                                <div><p className="font-medium text-green-800">Combustível</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Users className="h-6 w-6 text-green-600 mr-3" />
                                <div><p className="font-medium text-green-800">Marinheiro</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Music className="h-6 w-6 text-green-600 mr-3" />
                                <div><p className="font-medium text-green-800">Som Bluetooth</p></div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Waves className="h-6 w-6 text-green-600 mr-3" />
                                <div><p className="font-medium text-green-800">Flutuadores para banho</p></div>
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
                                  <span className="font-bold text-xl text-blue-700">R$ 7.000</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-semibold text-orange-800">Roteiro Praia Vermelha</h5>
                                    <p className="text-sm text-orange-600">Exploração da Praia Vermelha</p>
                                  </div>
                                  <span className="font-bold text-xl text-orange-700">R$ 7.800</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-semibold text-emerald-800">Roteiro Ilha Cagarras</h5>
                                    <p className="text-sm text-emerald-600">Aventura nas Ilhas Cagarras</p>
                                  </div>
                                  <span className="font-bold text-xl text-emerald-700">R$ 8.900</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {vessel.id === "oceano" && (
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
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                                <p className="text-lg font-semibold">{(vessel as any).specs?.duration}</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Validade</span>
                                <p className="text-lg font-semibold">{(vessel as any).specs?.validity}</p>
                              </div>
                            </div>
                          </div>

                          {/* Horários */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Clock className="h-5 w-5 mr-2" />
                              Horários Disponíveis
                            </h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Manhã</span>
                                <p className="text-lg font-semibold">{(vessel as any).schedule?.morning}</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tarde</span>
                                <p className="text-lg font-semibold">{(vessel as any).schedule?.afternoon}</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Noite</span>
                                <p className="text-lg font-semibold">{(vessel as any).schedule?.night}</p>
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

                          {/* Incluso */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Incluso no Passeio
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {(vessel as any).included?.map((item: string, index: number) => (
                                <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                                  <div>
                                    <p className="font-medium text-green-800">{item}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Preços */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Sun className="h-5 w-5 mr-2" />
                              Preços Base
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                               <div className="bg-emerald-50 p-4 lg:p-6 rounded-lg border border-emerald-200">
                                 <div className="text-center">
                                   <h5 className="font-semibold text-emerald-800 mb-2 text-sm lg:text-base">Até 50 passageiros</h5>
                                   <span className="text-lg lg:text-3xl font-bold text-emerald-700 break-words">{(vessel as any).pricing?.up50}</span>
                                 </div>
                               </div>
                               <div className="bg-blue-50 p-4 lg:p-6 rounded-lg border border-blue-200">
                                 <div className="text-center">
                                   <h5 className="font-semibold text-blue-800 mb-2 text-sm lg:text-base">Até 65 passageiros</h5>
                                   <span className="text-lg lg:text-3xl font-bold text-blue-700 break-words">{(vessel as any).pricing?.up65}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Serviços Adicionais */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Sparkles className="h-5 w-5 mr-2" />
                              Serviços Adicionais
                            </h4>
                            <div className="space-y-3">
                              {(vessel as any).additionalServices?.map((service: any, index: number) => (
                                <div key={index} className="border border-primary/20 p-4 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h5 className="font-semibold">{service.service}</h5>
                                      {service.note && (
                                        <p className="text-sm text-muted-foreground">{service.note}</p>
                                      )}
                                    </div>
                                    <span className="font-bold text-primary">{service.price}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Observações */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Shield className="h-5 w-5 mr-2" />
                              Observações Importantes
                            </h4>
                            <div className="space-y-2">
                              {(vessel as any).notes?.map((note: string, index: number) => (
                                <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                                  <Shield className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-sm text-yellow-800">{note}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Informações específicas da LADY RUTH */}
                      {vessel.id === "lady-ruth" && (
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
                                  <p className="font-medium">Tipo: Lancha Premium</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Users className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Capacidade: 13 passageiros</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Clock className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Duração: 5 horas</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <MapPin className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Embarque: Marina da Glória - RJ</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Comodidades */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Waves className="h-5 w-5 mr-2" />
                              Comodidades
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Fuel className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Combustível incluso</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Shield className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Marinheiro profissional</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Waves className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Tapetão flutuante</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Sun className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Prancha Stand Up</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Incluso no Passeio */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Incluso no Passeio
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">5 horas de um excelente passeio</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Combustível</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Marinheiro</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Tapetão Flutuante</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Prancha Stand Up</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Roteiros e Preços */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <MapPin className="h-5 w-5 mr-2" />
                              Roteiros Disponíveis
                            </h4>
                            <div className="space-y-4">
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-semibold text-primary">Roteiro 1: Marina da Glória x Flamengo x Botafogo x Mureta da Urca</h5>
                                  <span className="font-bold text-lg text-green-600">R$ 2.500,00</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Passeio completo pelos pontos mais icônicos da Baía de Guanabara</p>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-semibold text-primary">Roteiro 2: Marina da Glória x Flamengo x Botafogo x Mureta da Urca x Praia Vermelha</h5>
                                  <span className="font-bold text-lg text-green-600">R$ 2.900,00</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Roteiro estendido incluindo a paradisíaca Praia Vermelha</p>
                              </div>
                            </div>
                          </div>

                          {/* Serviços Adicionais */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Sparkles className="h-5 w-5 mr-2" />
                              Serviços Adicionais
                            </h4>
                            <div className="space-y-3">
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-semibold">Taxa do Churrasqueiro</h5>
                                  </div>
                                  <span className="font-bold text-primary">R$ 200,00</span>
                                </div>
                              </div>
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h5 className="font-semibold">Taxa de Embarque</h5>
                                  </div>
                                  <span className="font-bold text-primary">R$ 200,00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Informações específicas da YACHT REBECA */}
                      {vessel.id === "rebeca" && (
                        <div className="space-y-6">
                          {/* Especificações Técnicas */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Anchor className="h-5 w-5 mr-2" />
                              Especificações Técnicas
                            </h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Modelo</span>
                                <p className="text-lg font-semibold">Phantom 620 Pininfarina</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Comprimento</span>
                                <p className="text-lg font-semibold">62 pés</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                                <p className="text-lg font-semibold">16 passageiros</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Pernoite</span>
                                <p className="text-lg font-semibold">Até 7 passageiros</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                                <p className="text-lg font-semibold">6 horas</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Local</span>
                                <p className="text-lg font-semibold">Marina da Glória</p>
                              </div>
                            </div>
                          </div>

                          {/* Comodidades */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Coffee className="h-5 w-5 mr-2" />
                              Comodidades e Ambientes
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Users className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Espaço de Convivência</p>
                                  <p className="text-sm text-muted-foreground">Ambiente social amplo</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <BedIcon className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Cabines e Quartos</p>
                                  <p className="text-sm text-muted-foreground">Acomodações confortáveis</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Coffee className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Sala de Jantar</p>
                                  <p className="text-sm text-muted-foreground">Espaço para refeições</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <ChefHat className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Cozinha Completa</p>
                                  <p className="text-sm text-muted-foreground">Equipada para preparo de refeições</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Sun className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Amplo Cockpit</p>
                                  <p className="text-sm text-muted-foreground">Área externa espaçosa</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Waves className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Solário na Proa</p>
                                  <p className="text-sm text-muted-foreground">Duas opções de distribuição</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <ChefHat className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Cozinha Gourmet na Plataforma</p>
                                  <p className="text-sm text-muted-foreground">Área gourmet externa</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Star className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Fly-bridge Espaçoso</p>
                                  <p className="text-sm text-muted-foreground">Área superior de comando</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Award className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Design Pininfarina</p>
                                  <p className="text-sm text-muted-foreground">Estúdio italiano de Ferrari e Maserati</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Inclusos */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Serviços Inclusos
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Fuel className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Combustível</p>
                                  <p className="text-sm text-green-600">Incluído no passeio</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Anchor className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Marinheiro Profissional</p>
                                  <p className="text-sm text-green-600">Tripulação experiente</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Clock className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Passeio de 6 Horas</p>
                                  <p className="text-sm text-green-600">Duração completa incluída</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Shield className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Seguro da Embarcação</p>
                                  <p className="text-sm text-green-600">Cobertura completa</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Serviços Adicionais */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Plus className="h-5 w-5 mr-2" />
                              Serviços Adicionais (Não Inclusos)
                            </h4>
                            <div className="space-y-4">
                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                  <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                                  <h5 className="font-semibold text-orange-800">Importante</h5>
                                </div>
                                <p className="text-orange-700 mb-3">Os seguintes serviços NÃO estão inclusos no valor do passeio:</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                  <div className="flex items-center p-2 bg-white rounded border">
                                    <Users className="h-5 w-5 text-orange-600 mr-2" />
                                    <span className="text-sm font-medium">Serviço de Barman</span>
                                  </div>
                                  <div className="flex items-center p-2 bg-white rounded border">
                                    <ChefHat className="h-5 w-5 text-orange-600 mr-2" />
                                    <span className="text-sm font-medium">Churrasqueiro</span>
                                  </div>
                                </div>
                                <p className="text-xs text-orange-600 mt-2">Entre em contato para orçamento destes serviços opcionais.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Informações específicas do CATAMARÃ BLAU */}
                      {vessel.id === "blau" && (
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
                                <p className="text-lg font-semibold">Catamarã</p>
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
                                <p className="text-lg font-semibold">Marina da Glória</p>
                              </div>
                            </div>
                          </div>

                          {/* Comodidades */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Coffee className="h-5 w-5 mr-2" />
                              Comodidades e Ambientes
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Users className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Salão Interno Espaçoso</p>
                                  <p className="text-sm text-muted-foreground">Ambiente fechado confortável</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Sun className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Área Externa Ampla</p>
                                  <p className="text-sm text-muted-foreground">Deck aberto para contemplação</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Droplets className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Banheiros Completos</p>
                                  <p className="text-sm text-muted-foreground">Sanitários equipados</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <ChefHat className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Cozinha Equipada</p>
                                  <p className="text-sm text-muted-foreground">Para preparo de refeições</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <BedIcon className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Área de Descanso</p>
                                  <p className="text-sm text-muted-foreground">Espaço para relaxamento</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Music className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Sistema de Som</p>
                                  <p className="text-sm text-muted-foreground">Entretenimento a bordo</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Inclusos */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Serviços Inclusos
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Anchor className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Marinheiro Profissional</p>
                                  <p className="text-sm text-green-600">Tripulação experiente</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <ChefHat className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Churrasqueiro</p>
                                  <p className="text-sm text-green-600">Profissional para churrasco</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Fuel className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Combustível</p>
                                  <p className="text-sm text-green-600">Incluído no pacote</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Clock className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Passeio de 5 Horas</p>
                                  <p className="text-sm text-green-600">Duração completa incluída</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Roteiros Disponíveis */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <MapPin className="h-5 w-5 mr-2" />
                              Roteiros Disponíveis
                            </h4>
                            <div className="space-y-4">
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-semibold text-primary">Roteiro Padrão: Urca x Praia Vermelha</h5>
                                  <span className="font-bold text-lg text-green-600">R$ 8.000,00</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Roteiro clássico pela região da Urca e Praia Vermelha</p>
                              </div>
                              
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                  <Star className="h-5 w-5 text-blue-600 mr-2" />
                                  <h5 className="font-semibold text-blue-800">Roteiros Estendidos (Acréscimo R$ 2.000)</h5>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                                    <div>
                                      <p className="font-medium">Roteiro Itaipu</p>
                                      <p className="text-xs text-muted-foreground">Extensão para região de Itaipu</p>
                                    </div>
                                    <span className="font-bold text-primary">R$ 10.000,00</span>
                                  </div>
                                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                                    <div>
                                      <p className="font-medium">Roteiro Cagarras</p>
                                      <p className="text-xs text-muted-foreground">Extensão para Ilhas Cagarras</p>
                                    </div>
                                    <span className="font-bold text-primary">R$ 10.000,00</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Informações específicas do IATE PRESTIGE */}
                      {vessel.id === "prestige" && (
                        <div className="space-y-6">
                          {/* Especificações Técnicas */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Anchor className="h-5 w-5 mr-2" />
                              Especificações Técnicas
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Preço</span>
                                <p className="text-lg font-semibold">R$ 20.000,00</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                                <p className="text-lg font-semibold">6 horas</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Motorização</span>
                                <p className="text-lg font-semibold">Dois motores Volvo D13</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Lotação</span>
                                <p className="text-lg font-semibold">Até 20 pessoas</p>
                              </div>
                            </div>
                          </div>

                          {/* Acomodações */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <BedIcon className="h-5 w-5 mr-2" />
                              Acomodações
                            </h4>
                            <div className="grid gap-3">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <BedIcon className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">1 Suíte Master</p>
                                  <p className="text-sm text-muted-foreground">Cabine principal</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <BedIcon className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">1 Cabine de Solteiro</p>
                                  <p className="text-sm text-muted-foreground">Conversível para casal</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Waves className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">1 Cabine de Proa</p>
                                  <p className="text-sm text-muted-foreground">Com banheiro social</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Cozinha Completa */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <ChefHat className="h-5 w-5 mr-2" />
                              Cozinha Completa
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Box className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">2 Geladeiras</p>
                                  <p className="text-sm text-muted-foreground">Capacidade ampla</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Box className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Mini Freezer</p>
                                  <p className="text-sm text-muted-foreground">Para gelo e congelados</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Monitor className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Micro-ondas</p>
                                  <p className="text-sm text-muted-foreground">Aquecimento rápido</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Zap className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Fogão Elétrico</p>
                                  <p className="text-sm text-muted-foreground">Cozimento completo</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Conforto e Comodidades */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Star className="h-5 w-5 mr-2" />
                              Conforto e Comodidades
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Users className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Sala Espaçosa</p>
                                  <p className="text-sm text-muted-foreground">Dois sofás confortáveis</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Box className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Armários</p>
                                  <p className="text-sm text-muted-foreground">Nos quartos e na sala</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Droplets className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Água Quente</p>
                                  <p className="text-sm text-muted-foreground">Em todas as torneiras</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Zap className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Gerador 15 KVA</p>
                                  <p className="text-sm text-muted-foreground">Energia independente</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Sparkles className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Máquina de Gelo</p>
                                  <p className="text-sm text-muted-foreground">Gelo sempre disponível</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Music className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Som Bluetooth</p>
                                  <p className="text-sm text-muted-foreground">Automação independente</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Flybridge */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Waves className="h-5 w-5 mr-2" />
                              Flybridge
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Droplets className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Pia</p>
                                  <p className="text-sm text-muted-foreground">Área superior equipada</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <ChefHat className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Churrasqueira Elétrica</p>
                                  <p className="text-sm text-muted-foreground">Para refeições ao ar livre</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Informações específicas do YACHT CATAMARÃ ATLANTIS */}
                      {(vessel.id === "atlantis" || vessel.id === "nossa") && (
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
                                <p className="text-lg font-semibold">Iate Catamarã de Luxo</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tamanho</span>
                                <p className="text-lg font-semibold">120 pés</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Preço Base</span>
                                <p className="text-lg font-semibold">R$ 80.000,00</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Duração</span>
                                <p className="text-lg font-semibold">6 horas</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Capacidade</span>
                                <p className="text-lg font-semibold">80 passageiros (máx. 100)</p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <span className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Roteiro</span>
                                <p className="text-lg font-semibold">Urca</p>
                              </div>
                            </div>
                          </div>

                          {/* Comodidades */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Coffee className="h-5 w-5 mr-2" />
                              Comodidades e Ambientes
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Users className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Espaços Amplos para Grandes Eventos</p>
                                  <p className="text-sm text-muted-foreground">Ideal para celebrações</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Sun className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Múltiplos Níveis</p>
                                  <p className="text-sm text-muted-foreground">Áreas de convivência variadas</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Waves className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Área de Solarium Expansiva</p>
                                  <p className="text-sm text-muted-foreground">Espaço para banho de sol</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Monitor className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Salão Interno Climatizado</p>
                                  <p className="text-sm text-muted-foreground">Ambiente confortável</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Star className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Áreas de Deck Panorâmicas</p>
                                  <p className="text-sm text-muted-foreground">Vista 360° do mar</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Award className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Design Moderno e Elegante</p>
                                  <p className="text-sm text-muted-foreground">Arquitetura sofisticada</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Sparkles className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Iluminação Ambiente Sofisticada</p>
                                  <p className="text-sm text-muted-foreground">Ambientação perfeita</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                                <Users className="h-6 w-6 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Estrutura para Até 100 Convidados</p>
                                  <p className="text-sm text-muted-foreground">Capacidade máxima</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Inclusos */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Serviços Inclusos
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Anchor className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Marinheiro Profissional</p>
                                  <p className="text-sm text-green-600">Tripulação experiente</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Clock className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Passeio de 6 Horas</p>
                                  <p className="text-sm text-green-600">Duração completa incluída</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Shield className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Seguro Náutico</p>
                                  <p className="text-sm text-green-600">Cobertura completa</p>
                                </div>
                              </div>
                              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <Fuel className="h-6 w-6 text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium text-green-800">Combustível Incluso</p>
                                  <p className="text-sm text-green-600">Sem custos adicionais</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Serviços Adicionais */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 text-primary flex items-center">
                              <Plus className="h-5 w-5 mr-2" />
                              Serviços Adicionais
                            </h4>
                            <div className="space-y-4">
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                                  <h5 className="font-semibold text-blue-800">Passageiros Extras</h5>
                                </div>
                                <p className="text-blue-700 mb-2">Capacidade para até 100 convidados</p>
                                <div className="flex justify-between items-center p-2 bg-white rounded border">
                                  <span className="text-sm font-medium">Passageiros adicionais (acima de 80)</span>
                                  <span className="font-bold text-primary">R$ 1.500,00 por pessoa</span>
                                </div>
                              </div>
                              
                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                  <ChefHat className="h-5 w-5 text-orange-600 mr-2" />
                                  <h5 className="font-semibold text-orange-800">Experiências Gastronômicas</h5>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                                    <div>
                                      <p className="font-medium">Finger Food</p>
                                      <p className="text-xs text-muted-foreground">Consulte valores e opções</p>
                                    </div>
                                    <span className="text-sm text-orange-600">Sob consulta</span>
                                  </div>
                                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                                    <div>
                                      <p className="font-medium">Barbecue Experience</p>
                                      <p className="text-xs text-muted-foreground">Experiência completa com cerveja e drinks</p>
                                    </div>
                                    <span className="font-bold text-primary">R$ 1.500,00/pessoa</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {vessel.id !== "segue" && vessel.id !== "myway" && vessel.id !== "senna" && vessel.id !== "luisa" && vessel.id !== "dragao" && vessel.id !== "mcell" && vessel.id !== "flyhi" && vessel.id !== "grandraray" && vessel.id !== "mangata" && vessel.id !== "comendador" && vessel.id !== "seven" && vessel.id !== "oceano" && vessel.id !== "lady-ruth" && vessel.id !== "rebeca" && vessel.id !== "blau" && vessel.id !== "prestige" && vessel.id !== "atlantis" && vessel.id !== "nossa" && (
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    <div className="flex flex-col items-center text-center p-2 sm:p-4 border rounded-lg">
                      <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
                      <span className="text-xs sm:text-sm font-medium">{vessel.capacity} pessoas</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 sm:p-4 border rounded-lg">
                      <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
                      <span className="text-xs sm:text-sm font-medium">{vessel.duration}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 sm:p-4 border rounded-lg">
                      <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
                      <span className="text-xs sm:text-sm font-medium">{vessel.location}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 sm:p-4 border rounded-lg">
                      <Star className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
                      <span className="text-xs sm:text-sm font-medium">⭐ {vessel.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Reserva */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 lg:top-24">
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
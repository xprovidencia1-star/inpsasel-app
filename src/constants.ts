export interface Location {
  id: string;
  state: string;
  address: string;
  lat?: number;
  lng?: number;
}

export const LOCATIONS: Location[] = [
  { id: 'anzoategui', state: 'Anzoátegui', address: 'Av. Libertad, Qta. Margarita, a una cuadra antes del Hotel Teramun, Lecheria.' },
  { id: 'apure', state: 'Apure', address: 'Av. Carabobo, Municipio San Fernando, Edif. Ministerio De Trabajo, Piso 3, Oficina 2.' },
  { id: 'aragua', state: 'Aragua', address: 'Urb. Residencial La Romana, Av. Miranda Quinta B-12, Maracay.' },
  { id: 'barinas', state: 'Barinas', address: 'Calle 3 Araguaney, Sector Campo La Meza, Parcela 23 O2, Alto Barinas.' },
  { id: 'bolivar', state: 'Bolívar', address: 'Unare 1, Av. Carrera Aerocuar, Centro Empresarial Etna Al Lado Del Edificio Pdvsa, Puerto Ordaz.' },
  { id: 'capital', state: 'Capital y La Guaira', address: 'Av. Universidad, Esquina De San Francisco, Centro Mercantil San Francisco, Piso 5, Parroquia Catedral, Dist. Capital.' },
  { id: 'carabobo', state: 'Carabobo', address: 'Av. Sucre, Calle Briceño, Antiguo Seguro Social de Guacara, Municipio Guacara, Parroquia Guacara.' },
  { id: 'cojedes', state: 'Cojedes', address: 'Av.León Miski, Sector Hilanderia, Edificio Pdval 1er Nivel, Tinaquillo.' },
  { id: 'costa_oriental', state: 'Costa Oriental del Lago', address: 'Calle Bermúdez, Casa N°72, Parroquia Alonso Ojeda, Municipio Lagunilla.' },
  { id: 'falcon', state: 'Falcón', address: 'Prolongación Girador Con Calle Bella Vista, Urbanización Santa Irene, Quinta Inpsasel, Punto Fijo.' },
  { id: 'guarico', state: 'Guárico', address: 'Calle Role C/C Morita, Casa N° 70, Mcpio. Infante, Valle de la Pascua.' },
  { id: 'lara_trujillo', state: 'Lara / Trujillo', address: 'Av. Moran, Esquina Carrera 23 Al Lado Del Consulado de Portugal, Mcpio. Yribarren.' },
  { id: 'merida', state: 'Mérida', address: 'Urb. La Pompeya, Av. Las Américas, Cruce Con Calle Dos A Dos, Cuadra Del Mercado Principal, Mcpio. Libertador.' },
  { id: 'miranda', state: 'Miranda', address: 'Calle 2, Torre Emmsa , Piso 2, La Urbina, Municipio Sucre.' },
  { id: 'monagas_delta', state: 'Monagas / Delta Amacuro', address: 'Av. Fuerzas Armadas, Casa N° 12 Maturín, Parroquia San Simón' },
  { id: 'nueva_esparta', state: 'Nueva Esparta', address: 'Centro comercial Cemtrun, Porlamar' },
  { id: 'portuguesa', state: 'Portuguesa', address: 'Av. 13 De Junio, Diagonal A La Funeraria La Corteza, a 200 Metros del Monumento La Espiga, Araure' },
  { id: 'sucre', state: 'Sucre', address: 'Av. María Rodríguez, Antigua Av. Fernandez De Zerpa, Entre La Policlínica Sucre Y Clínica Santa Ana, Quinta Inpsasel.' },
  { id: 'tachira', state: 'Táchira', address: 'Calle 12 Entre La Séptima Av. Centro De San Cristóbal, Edif. Gabriel.' },
  { id: 'yaracuy', state: 'Yaracuy', address: 'Urb. Daniel Carías De Lima, Calle 11 C/ Av. Fermín Caldrón, Chivacoa, Municipio Bruzual.' },
  { id: 'zulia', state: 'Zulia', address: 'Av. Circunvalación 2, Palacio de los Eventos De Maracaibo, Piso 1' }
];

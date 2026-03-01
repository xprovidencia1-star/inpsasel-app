export interface Location {
  id: string;
  state: string;
  address: string;
  lat?: number;
  lng?: number;
}

export const LOCATIONS: Location[] = [
  { id: 'anzoategui', state: 'Anzoátegui', address: 'Avenida Libertad, Quinta Margarita, a una cuadra del Hotel Teramun, Lechería' },
  { id: 'apure', state: 'Apure', address: 'Av. Carabobo entre Calle Boyaca y Calle Girardot, San Fernando, Estado Apure.' },
  { id: 'aragua', state: 'Aragua', address: 'Urb. Residencial La Romana, Av. Miranda Quinta B-12, Maracay.' },
  { id: 'barinas', state: 'Barinas', address: 'Calle 3 Araguaney, Sector Campo La Meza, Parcela 23 O2, Alto Barinas.' },
  { id: 'bolivar_amazonas', state: 'Bolívar / Amazonas', address: 'Unare 1, Av. Carrera Aerocuar, Centro Empresarial Etna Al Lado Del Edificio Pdvsa, Puerto Ordaz.' },
  { id: 'capital', state: 'Caracas (Capital y La Guaira)', address: 'Av. Universidad, Esquina San Francisco Centro Mercantil San Francisco, Piso 5, Parroquia Capital, Distrito Capital' },
  { id: 'taquilla_unica_caracas', state: 'Caracas (Taquilla unica)', address: 'Av. Este 6 Bis, Caracas 1010, Distrito Capital, Venezuela' },
  { id: 'carabobo', state: 'Carabobo', address: 'Av. Sucre, Calle Briceño, Antiguo Seguro Social de Guacara, Municipio Guacara, Parroquia Guacara' },
  { id: 'cojedes', state: 'Cojedes', address: 'Av. León Miski, Complejo Agroindustrial "Pedro Camejo", Edificio PEDEVAL, primer nivel, Tinaquillo, Municipio Tinaquillo, Estado Cojedes.' },
  { id: 'costa_oriental', state: 'Costa Oriental del Lago', address: 'Calle Bermúdez, casa #72, Parroquia Alonso de Ojeda, Ciudad Ojeda, Municipio Lagunillas, Costa Oriental del Lago, Estado Zulia.' },
  { id: 'falcon', state: 'Falcón', address: 'Prolongación Girardot Con Calle Bella Vista, Urbanización Santa Irene, Quinta Inpsasel, Punto Fijo.' },
  { id: 'guarico', state: 'Guárico', address: 'Calle El Roble, esquina La Morita a 100 mts de la av. Libertador Parroquia Valle de la Pascua, Municipio Leonardo Infante, Edo. Guárico.' },
  { id: 'lara_trujillo', state: 'Lara / Trujillo', address: 'Av. Morán, Esquina Carrera 23 Al Lado Del Consulado de Portugal, Mcpio. Iribarren' },
  { id: 'merida', state: 'Mérida', address: 'Av. Las Américas Urb. Pompeya Quinta INPSASEL' },
  { id: 'miranda', state: 'Miranda', address: 'Calle 2, Torre Emmsa , Piso 2, La Urbina, Municipio Sucre.' },
  { id: 'monagas_delta', state: 'Monagas / Delta Amacuro', address: 'Av. Fuerzas Armadas, Casa N° 12 Maturín, Parroquia San Simón' },
  { id: 'nueva_esparta', state: 'Nueva Esparta', address: 'Centro comercial Cemtrun, Porlamar' },
  { id: 'portuguesa', state: 'Portuguesa', address: 'Av. 13 De Junio, Diagonal A La Funeraria La Corteza, a 200 Metros del Monumento La Espiga, Araure' },
  { id: 'sucre', state: 'Sucre', address: 'Av. María Rodríguez Fernández, Antigua Av. Fernández De Zerpa, Entre La Policlínica Sucre Y Clínica Santa Ana, Quinta Inpsasel.' },
  { id: 'tachira', state: 'Táchira', address: 'Calle 12 entre séptima avenida y carrera 8, edificio Gabriel, piso 2 y 3, parroquia San Juan Bautista, Municipio San Cristóbal, Estado Táchira.' },
  { id: 'yaracuy', state: 'Yaracuy', address: 'Urb. Daniel Carías De Lima, Calle 11 C/ Av. Fermín Calderón, Chivacoa, Municipio Bruzual.' },
  { id: 'zulia', state: 'Zulia', address: 'Av. Circunvalación 2, Palacio de los Eventos De Maracaibo, Piso 1' }
];

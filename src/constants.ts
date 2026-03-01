export interface Location {
  id: string;
  state: string;
  address: string;
  phone?: string;
  email?: string;
  mapLink?: string;
  lat?: number;
  lng?: number;
}

const createMapLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const LOCATIONS: Location[] = [
  { id: 'anzoategui', state: 'Anzoátegui', address: 'Avenida Libertad, Quinta Margarita, a una cuadra del Hotel Teramun, Lechería', phone: '0412.049.42.39', email: 'geresat.anz@gmail.com', mapLink: createMapLink('Avenida Libertad, Quinta Margarita, Lechería, Anzoátegui, Venezuela') },
  { id: 'apure', state: 'Apure', address: 'Av. Carabobo entre Calle Boyaca y Calle Girardot, San Fernando, Estado Apure.', phone: '0414.439.64.85', email: 'inpsasel2030apure@gmail.com', mapLink: createMapLink('Av. Carabobo entre Calle Boyaca y Calle Girardot, San Fernando, Apure, Venezuela') },
  { id: 'aragua', state: 'Aragua', address: 'Urb. Residencial La Romana, Av. Miranda Quinta B-12, Maracay.', phone: '0412.455.47.95', email: 'geresataragua.oficial@gmail.com', mapLink: createMapLink('Urb. Residencial La Romana, Av. Miranda Quinta B-12, Maracay, Aragua, Venezuela') },
  { id: 'barinas', state: 'Barinas', address: 'Calle 3 Araguaney, Sector Campo La Meza, Parcela 23 O2, Alto Barinas.', phone: '0273.541.92.98 / 0273.541.85.34', email: 'geresatbarinas09@gmail.com', mapLink: createMapLink('Calle 3 Araguaney, Sector Campo La Meza, Alto Barinas, Barinas, Venezuela') },
  { id: 'bolivar_amazonas', state: 'Bolívar / Amazonas', address: 'Unare 1, Av. Carrera Aerocuar, Centro Empresarial Etna Al Lado Del Edificio Pdvsa, Puerto Ordaz.', phone: '0416.060.89.48', email: 'guayana050820@gmail.com', mapLink: createMapLink('Unare 1, Centro Empresarial Etna, Puerto Ordaz, Bolívar, Venezuela') },
  { id: 'capital', state: 'Caracas (Sede Central INPSASEL)', address: '35 Av. Este 0, Caracas 1011, Distrito Capital', phone: '0426.629.66.79', email: 'gerencia.geresatcapital@gmail.com', mapLink: 'https://www.google.com/maps/place/Instituto+Nacional+de+Prevenci%C3%B3n,+Salud+y+Seguridad+Laboral/@10.5050908,-66.9072483,703m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8c2a5ed24d1f1b11:0xf60d623ac65deda6!8m2!3d10.5050908!4d-66.9072483!16s%2Fg%2F1tgcbk81' },
  { id: 'taquilla_unica_caracas', state: 'Caracas (Taquilla unica)', address: 'Av. Este 6 Bis, Caracas 1010, Distrito Capital, Venezuela', phone: '80046772735 / 0800INPSASEL', email: 'inpsasel@inpsaseletica.gob.ve', mapLink: 'https://maps.app.goo.gl/z9RFPMmNGq3hLZbdA' },
  { id: 'carabobo', state: 'Carabobo', address: 'Av. Sucre, Calle Briceño, Antiguo Seguro Social de Guacara, Municipio Guacara, Parroquia Guacara', phone: '0414.047.04.70', email: 'rhh.admoncarabobo@gmail.com', mapLink: createMapLink('Antiguo Seguro Social de Guacara, Guacara, Carabobo, Venezuela') },
  { id: 'cojedes', state: 'Cojedes', address: 'Av. León Miski, Complejo Agroindustrial "Pedro Camejo", Edificio PEDEVAL, primer nivel, Tinaquillo, Municipio Tinaquillo, Estado Cojedes.', phone: '0412.916.61.24', email: 'gcojedes@gmail.com', mapLink: createMapLink('Complejo Agroindustrial Pedro Camejo, Tinaquillo, Cojedes, Venezuela') },
  { id: 'costa_oriental', state: 'Costa Oriental del Lago', address: 'Calle Bermúdez, casa #72, Parroquia Alonso de Ojeda, Ciudad Ojeda, Municipio Lagunillas, Costa Oriental del Lago, Estado Zulia.', phone: '0265.632.24.55', email: 'colgeresat2019@gmail.com', mapLink: createMapLink('Calle Bermúdez, casa 72, Ciudad Ojeda, Zulia, Venezuela') },
  { id: 'falcon', state: 'Falcón', address: 'Prolongación Girardot Con Calle Bella Vista, Urbanización Santa Irene, Quinta Inpsasel, Punto Fijo.', phone: '0412.674.04.04', email: 'gomezlouser@gmail.com', mapLink: createMapLink('Urbanización Santa Irene, Punto Fijo, Falcón, Venezuela') },
  { id: 'guarico', state: 'Guárico', address: 'Calle El Roble, esquina La Morita a 100 mts de la av. Libertador Parroquia Valle de la Pascua, Municipio Leonardo Infante, Edo. Guárico.', phone: '0235.341.33.60 / 0235.341.90.48', email: 'geresatguarico1@gmail.com', mapLink: createMapLink('Calle El Roble, Valle de la Pascua, Guárico, Venezuela') },
  { id: 'lara_trujillo', state: 'Lara / Trujillo', address: 'Av. Morán, Esquina Carrera 23 Al Lado Del Consulado de Portugal, Mcpio. Iribarren', phone: '0414.550.05.26', email: 'geresat.lara1@gmail.com', mapLink: createMapLink('Av. Morán, Esquina Carrera 23, Barquisimeto, Lara, Venezuela') },
  { id: 'merida', state: 'Mérida', address: 'Av. Las Américas Urb. Pompeya Quinta INPSASEL', phone: '0274.263.16.76 / 0274.263.13.55', email: 'inpsaselmerida0922@gmail.com', mapLink: createMapLink('Av. Las Américas Urb. Pompeya, Mérida, Venezuela') },
  { id: 'miranda', state: 'Miranda', address: 'Calle 2, Torre Emmsa , Piso 2, La Urbina, Municipio Sucre.', phone: '0424-222-85-44', email: 'geresatmirandagerente@gmail.com', mapLink: createMapLink('Torre Emmsa, La Urbina, Miranda, Venezuela') },
  { id: 'monagas_delta', state: 'Monagas / Delta Amacuro', address: 'Av. Fuerzas Armadas, Casa N° 12 Maturín, Parroquia San Simón', phone: '0414.760.16.21', email: 'inpsaselmonagas2022@gmail.com', mapLink: createMapLink('Av. Fuerzas Armadas, Maturín, Monagas, Venezuela') },
  { id: 'nueva_esparta', state: 'Nueva Esparta', address: 'Centro comercial Cemtrun, Porlamar', phone: '0412.095.54.26', email: 'geresatnuevaesparta@gmail.com', mapLink: createMapLink('Centro comercial Centrum, Porlamar, Nueva Esparta, Venezuela') },
  { id: 'portuguesa', state: 'Portuguesa', address: 'Av. 13 De Junio, Diagonal A La Funeraria La Corteza, a 200 Metros del Monumento La Espiga, Araure', phone: '0255.664.08.76 / 0255.621.35.03', email: 'geresatportuguesa2025@gmail.com', mapLink: createMapLink('Monumento La Espiga, Araure, Portuguesa, Venezuela') },
  { id: 'sucre', state: 'Sucre', address: 'Av. María Rodríguez Fernández, Antigua Av. Fernández De Zerpa, Entre La Policlínica Sucre Y Clínica Santa Ana, Quinta Inpsasel.', phone: '0293.431.27.33', email: 'geresat.sucre.gerencia.2024@gmail.com', mapLink: createMapLink('Policlínica Sucre, Cumaná, Sucre, Venezuela') },
  { id: 'tachira', state: 'Táchira', address: 'Calle 12 entre séptima avenida y carrera 8, edificio Gabriel, piso 2 y 3, parroquia San Juan Bautista, Municipio San Cristóbal, Estado Táchira.', phone: '0426.520.12.79 / 0276.344.00.30', email: 'gerenciainpsaseltachira@gmail.com', mapLink: createMapLink('Calle 12 entre séptima avenida y carrera 8, San Cristóbal, Táchira, Venezuela') },
  { id: 'yaracuy', state: 'Yaracuy', address: 'Urb. Daniel Carías De Lima, Calle 11 C/ Av. Fermín Calderón, Chivacoa, Municipio Bruzual.', phone: '0412.053.65.03', email: 'gerenciayaracuyw1@gmail.com', mapLink: createMapLink('Chivacoa, Municipio Bruzual, Yaracuy, Venezuela') },
  { id: 'zulia', state: 'Zulia', address: 'Av. Circunvalación 2, Palacio de los Eventos De Maracaibo, Piso 1', phone: '0414.921.19.10', email: 'zuliagerenciainpsasel@gmail.com', mapLink: createMapLink('Palacio de los Eventos De Maracaibo, Zulia, Venezuela') }
];

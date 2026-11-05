// Mochila Mágica - Datos por Grado - Hecho por equipo Almoloya
// Dificultad progresiva: 1º muy sencillo con dibujitos (4-5 años) -> 6º difícil

const bancosPorGrado = {
  // 1º PRIMARIA - 4-5 AÑOS - NO SABEN LEER - MUY SENCILLO VISUAL CON EMOJIS
  1: {
    matematicas: [
      { n: "¿Cuántos 🍎 hay? 🍎🍎", op: ["2", "3", "1"], c: 0, exp: "Son 2 manzanas, cuenta con deditos" },
      { n: "Cuenta los patitos 🐤🐤🐤", op: ["3", "2", "4"], c: 0, exp: "3 patitos amarillos" },
      { n: "¿Cuánto es 1 + 1? ✋", op: ["2", "1", "3"], c: 0, exp: "1+1=2 con tus dedos" },
      { n: "¿Cuál es más? 🍎 vs 🍎🍎🍎", op: ["🍎🍎🍎", "🍎", "Igual"], c: 0, exp: "3 manzanas es más que 1" },
      { n: "¿Cuánto es 2 - 1? 🍎🍎 - 🍎", op: ["1", "2", "0"], c: 0, exp: "2-1=1" },
      { n: "¿Cuántos ojos tienes? 👀", op: ["2", "1", "3"], c: 0, exp: "2 ojitos" },
    ],
    espanol: [
      { n: "¿Qué letra es A? 🅰️", op: ["A", "B", "C"], c: 0, exp: "Letra A de Avión" },
      { n: "¿Quién hace Miau? 🐱", op: ["Gato 🐱", "Perro 🐶", "Pato 🦆"], c: 0, exp: "El gato hace Miau" },
      { n: "¿Qué color es 🟦?", op: ["Azul 💙", "Rojo ❤️", "Verde 💚"], c: 0, exp: "Cuadro azul" },
      { n: "¿Cuál es vocal? A", op: ["A", "M", "P"], c: 0, exp: "A es vocal" },
      { n: "¿Con qué ves? 👀", op: ["Ojos", "Manos", "Pies"], c: 0, exp: "Ves con ojos" },
    ],
    historia: [
      { n: "¿Bandera de México? 🇲🇽", op: ["México 🇲🇽", "USA 🇺🇸", "España 🇪🇸"], c: 0, exp: "Verde, blanco y rojo" },
      { n: "¿Quién tocó la campana? 🔔", op: ["Hidalgo", "Un niño", "Doctor"], c: 0, exp: "Héroe Hidalgo" },
    ],
    ciencias: [
      { n: "¿Dónde viven los peces? 🐠", op: ["Agua 💧", "Aire", "Tierra"], c: 0, exp: "En el agua" },
      { n: "¿Qué animal dice Guau? 🐶", op: ["Perro", "Gato", "Pez"], c: 0, exp: "Perro Guau" },
      { n: "¿Con qué hueles? 👃", op: ["Nariz", "Manos", "Pies"], c: 0, exp: "Nariz" },
    ],
    arte: [
      { n: "¿Color del sol? ☀️", op: ["Amarillo", "Azul", "Rojo"], c: 0, exp: "Sol amarillo" },
      { n: "¿Con qué pintas? 🖌️", op: ["Colores", "Zapatos", "Cuchara"], c: 0, exp: "Con colores" },
    ]
  },
  // 2º PRIMARIA - 6 AÑOS - EMPIEZA A LEER - SUMAS HASTA 10
  2: {
    matematicas: [
      { n: "¿Cuánto es 3 + 2?", op: ["4", "5", "6"], c: 1, exp: "3+2=5" },
      { n: "¿Cuánto es 5 - 2?", op: ["2", "3", "4"], c: 1, exp: "5-2=3" },
      { n: "¿Cuánto es 2 + 4?", op: ["5", "6", "7"], c: 1, exp: "6" },
      { n: "¿Cuánto es 6 - 1?", op: ["5", "6", "4"], c: 0, exp: "5" },
    ],
    espanol: [
      { n: "¿Cómo se escribe casa?", op: ["casa", "kasa", "cassa"], c: 0, exp: "casa con c" },
      { n: "¿Mayúscula? México", op: ["México", "méxico", "MeXiCo"], c: 0, exp: "México con mayúscula" },
    ],
    historia: [
      { n: "¿Quién tocó campana 1810? 🔔", op: ["Hidalgo", "Morelos", "Juárez"], c: 0, exp: "Miguel Hidalgo" }
    ],
    ciencias: [
      { n: "¿Qué necesita planta?", op: ["Agua,sol,tierra", "Solo agua", "Solo sol"], c: 0, exp: "Agua, sol y tierra" }
    ],
    arte: [
      { n: "¿Azul + amarillo?", op: ["Verde", "Rojo", "Naranja"], c: 0, exp: "Verde" }
    ]
  },
  // 3º PRIMARIA - MULTIPLICACIÓN INICIO
  3: {
    matematicas: [
      { n: "¿Cuánto es 3 x 2?", op: ["5", "6", "7"], c: 1, exp: "3x2=6" },
      { n: "¿Cuánto es 4 x 3?", op: ["12", "10", "11"], c: 0, exp: "12" },
      { n: "¿Cuánto es 5 x 2?", op: ["10", "8", "12"], c: 0, exp: "10" },
    ],
    espanol: [
      { n: "¿Antónimo de grande?", op: ["Pequeño", "Enorme", "Gigante"], c: 0, exp: "Pequeño es opuesto a grande" },
      { n: "¿Sinónimo de feliz?", op: ["Contento", "Triste", "Enojado"], c: 0, exp: "Feliz = contento" },
    ],
    historia: [
      { n: "¿Grito Independencia año?", op: ["1810", "1521", "1910"], c: 0, exp: "16 septiembre 1810" }
    ],
    ciencias: [
      { n: "¿Cuántos planetas?", op: ["7", "8", "9"], c: 1, exp: "8 planetas" }
    ],
    arte: [
      { n: "¿Mezcla azul+amarillo?", op: ["Verde", "Rojo", "Naranja"], c: 0, exp: "Verde" }
    ]
  },
  // 4º PRIMARIA - DIVISIÓN Y FRACCIONES SIMPLES
  4: {
    matematicas: [
      { n: "¿Cuánto es 12 / 3?", op: ["3", "4", "5"], c: 1, exp: "12/3=4" },
      { n: "¿Cuánto es 1/2 de 10?", op: ["5", "2", "10"], c: 0, exp: "Mitad de 10 es 5" },
      { n: "¿Cuánto es 15 / 5?", op: ["3", "4", "5"], c: 0, exp: "3" },
    ],
    espanol: [
      { n: "¿Qué es un verbo?", op: ["Acción", "Cosa", "Color"], c: 0, exp: "Verbo es acción" }
    ],
    historia: [
      { n: "¿Caída Tenochtitlán?", op: ["1325", "1521", "1810"], c: 1, exp: "1521" }
    ],
    ciencias: [
      { n: "¿Órgano bombea sangre?", op: ["Corazón", "Pulmon", "Estomago"], c: 0, exp: "Corazón" }
    ],
    arte: [
      { n: "¿Color primario?", op: ["Rojo", "Verde", "Naranja"], c: 0, exp: "Rojo es primario" }
    ]
  },
  // 5º PRIMARIA - FRACCIONES Y PORCENTAJES
  5: {
    matematicas: [
      { n: "¿Cuánto es 25% de 100?", op: ["25", "50", "10"], c: 0, exp: "25% de 100 = 25" },
      { n: "¿Cuánto es 3/4 + 1/4?", op: ["1", "3/4", "1/2"], c: 0, exp: "3/4+1/4=1 entero" },
      { n: "¿Cuánto es 50% de 80?", op: ["40", "30", "50"], c: 0, exp: "40" },
    ],
    espanol: [
      { n: "¿Sinónimo de rápido?", op: ["Veloz", "Lento", "Pequeño"], c: 0, exp: "Veloz" }
    ],
    historia: [
      { n: "¿Revolución año?", op: ["1910", "1810", "1521"], c: 0, exp: "1910" }
    ],
    ciencias: [
      { n: "¿Fotosíntesis produce?", op: ["Oxígeno", "Agua", "Tierra"], c: 0, exp: "Oxígeno" }
    ],
    arte: [
      { n: "¿Qué es escultura?", op: ["Arte 3D", "Dibujo", "Canción"], c: 0, exp: "Arte en 3D" }
    ]
  },
  // 6º PRIMARIA - DIFÍCIL
  6: {
    matematicas: [
      { n: "¿Cuánto es 15% de 200?", op: ["30", "20", "15"], c: 0, exp: "15% de 200 = 30" },
      { n: "¿Cuánto es 3/5 de 100?", op: ["60", "40", "20"], c: 0, exp: "60" },
      { n: "¿Cuánto es 40% de 250?", op: ["100", "80", "120"], c: 0, exp: "100" },
      { n: "¿Cuánto es 2/3 de 90?", op: ["60", "30", "45"], c: 0, exp: "60" },
    ],
    espanol: [
      { n: "¿Antónimo grande y sinónimo enorme?", op: ["Pequeño/Enorme", "Grande/Pequeño", "Gigante/Pequeño"], c: 0, exp: "Pequeño antónimo, Enorme sinónimo" }
    ],
    historia: [
      { n: "¿Constitución 1917 dónde?", op: ["Querétaro", "CDMX", "Dolores"], c: 0, exp: "Querétaro" }
    ],
    ciencias: [
      { n: "¿Elemento más abundante universo?", op: ["Hidrógeno", "Oxígeno", "Carbono"], c: 0, exp: "Hidrógeno" }
    ],
    arte: [
      { n: "¿Qué es arte abstracto?", op: ["Sin forma real", "Retrato", "Paisaje"], c: 0, exp: "Sin forma real" }
    ]
  }
};

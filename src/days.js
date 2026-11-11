// Contenido original de demostración. Editar y aprobar antes de vender.
export const days = [
['Reconozco mi valor','Mi valor no depende de mi productividad ni de la opinión de los demás.','¿Qué tres cualidades reconozco en mí hoy?','Escribí tres cualidades y un ejemplo concreto de cada una.'],
['Escucho mi diálogo interno','Puedo observar mis pensamientos sin convertirlos automáticamente en hechos.','¿Qué frase dura suelo decirme?','Reescribí esa frase de una manera más justa y realista.'],
['Distingo hechos de historias','Una interpretación no es necesariamente toda la verdad.','¿Qué historia me cuento cuando algo sale mal?','Anotá un hecho, tu interpretación y otra explicación posible.'],
['Me permito descansar','El descanso puede ser una decisión valiosa, no una recompensa que debo ganar.','¿En qué momento siento culpa por descansar?','Reservá diez minutos de pausa sin exigirte producir.'],
['Practico la gratitud consciente','Puedo agradecer lo presente y seguir deseando crecer.','¿Qué detalle cotidiano valoro y por qué?','Escribí tres agradecimientos específicos y sus motivos.'],
['Aprendo a recibir','Aceptar ayuda o reconocimiento no disminuye mi independencia.','¿Qué me cuesta aceptar de los demás?','Respondé «gracias» a un reconocimiento sin restarle importancia.'],
['Celebro mis avances','Un paso pequeño también es evidencia de movimiento.','¿Qué hice esta semana que antes postergaba?','Registrá tres avances y elegí uno para celebrar.'],
['Reviso mis creencias sobre el dinero','Puedo analizar mis ideas sobre el dinero sin juzgarme.','¿Qué aprendí sobre el dinero en mi entorno?','Escribí una creencia heredada y cuestioná si aún te sirve.'],
['Claridad antes que presión','Tomar decisiones claras puede ser más útil que exigirme resultados inmediatos.','¿Qué área de mi vida necesita claridad?','Elegí una decisión pequeña y definí su siguiente paso.'],
['Puedo pedir lo que necesito','Expresar mis necesidades con respeto es una habilidad que puedo practicar.','¿Qué necesidad me cuesta comunicar?','Redactá una petición clara, breve y amable.'],
['Mi relación con el merecimiento','No necesito agotarme para justificar mis deseos.','¿Cuándo confundo esfuerzo con valor personal?','Identificá una exigencia que puedas ajustar esta semana.'],
['Visualizo posibilidades reales','Imaginar escenarios útiles me ayuda a pensar en acciones concretas.','¿Cómo sería un día más alineado con mis valores?','Describí ese día e identificá una acción accesible.'],
['Confío en mis decisiones','Puedo aprender de cada decisión sin esperar certeza absoluta.','¿Qué decisión vengo evitando por miedo a equivocarme?','Anotá dos opciones, sus consecuencias y un siguiente paso.'],
['Abundancia con límites','Cuidar mi tiempo y mi energía también forma parte de una vida plena.','¿Dónde necesito establecer un límite?','Prepará una frase respetuosa para expresar ese límite.'],
['Elijo mi próxima versión','La identidad también se construye con lo que practico cada día.','¿Qué tipo de mujer quiero ser en situaciones difíciles?','Elegí una conducta concreta que represente esa intención.'],
['Creo un hábito sostenible','La constancia se facilita cuando la acción es pequeña y específica.','¿Qué hábito quiero desarrollar sin perfeccionismo?','Definí una acción de dos minutos y cuándo la harás.'],
['Reconozco mis fortalezas','Puedo confiar en recursos que ya he desarrollado.','¿Qué desafío resolví usando mis habilidades?','Escribí una experiencia y la fortaleza que utilizaste.'],
['Me vinculo desde el respeto','Puedo cultivar relaciones que respeten mis límites y necesidades.','¿Qué relación o conversación quiero cuidar mejor?','Elegí un gesto de escucha o comunicación consciente.'],
['Me abro a oportunidades','Reconocer una oportunidad no implica aceptar todas las propuestas.','¿Qué oportunidad merece una mirada más atenta?','Investigá un paso posible y evaluá si se alinea con vos.'],
['Diseño mi siguiente mes','Un plan sencillo convierte una intención en algo observable.','¿Qué cambio quisiera sostener durante 30 días?','Anotá una meta concreta y tres acciones realistas.'],
['Integro mi transformación','Puedo seguir creciendo sin dejar de reconocer quién soy hoy.','¿Qué aprendí de mí durante estos 21 días?','Escribí una declaración personal y elegí tu próximo paso.']
].map(([title,affirmation,question,action],index)=>({day:index+1,title,affirmation,question,action,phase:index<7?'Reconexión':index<14?'Abundancia':'Nueva versión'}));

// Textos originales desarrollados para la primera semana de la experiencia.
export const weekOne = {
  1: {
    reading: 'Quizá aprendiste a medir tu valor por lo que terminás, por lo que resolvés o por cómo te ven los demás. Esa medida cambia todos los días: unas veces alcanzás todo y otras necesitás detenerte. Tu dignidad, en cambio, no depende de esa lista. Hoy vas a reconocer recursos personales que están presentes incluso cuando no conseguís un resultado.',
    prompts: ['Una cualidad que me acompaña incluso en días difíciles es…', 'Una situación que atravesé y de la que aprendí fue…', 'Quisiera dejar de exigirme demostrar que…'],
    ritual: 'Elegí una de tus cualidades y escribí una evidencia concreta. Terminá el día recordando una decisión que tomaste desde esa cualidad.',
    close: '¿Qué sentiste al describirte sin hablar de tus logros?'
  },
  2: {
    reading: 'El diálogo interno suele hablar rápido y con mucha seguridad. Puede decir “siempre me equivoco” cuando solo hubo un error o “no estoy lista” cuando en realidad falta un paso de aprendizaje. Observar esas frases no requiere combatirlas. Al ponerlas por escrito, ganás un momento para decidir si son datos, temores o viejos hábitos de pensamiento.',
    prompts: ['La frase que aparece cuando intento algo nuevo es…', 'Esa frase suele aparecer después de…', 'Una manera más amable y precisa de hablarme sería…'],
    ritual: 'Durante el día, detectá una frase absoluta como “nunca” o “siempre”. Anotá la situación y reformulala sin exageraciones.',
    close: '¿Qué cambió al poner tu pensamiento en palabras?'
  },
  3: {
    reading: 'Una experiencia dolorosa puede enseñarte a anticipar problemas, pero no puede predecir todos tus futuros intentos. A veces confundimos un hecho con la explicación que construimos sobre él. Al diferenciarlos aparecen otras posibilidades: aprender, pedir ayuda o ensayar algo distinto sin negar lo que ocurrió.',
    prompts: ['El hecho concreto que ocurrió fue…', 'La historia que construí a partir de ese hecho fue…', 'Otra explicación posible, más equilibrada, es…'],
    ritual: 'Elegí una situación pendiente y hacé tres columnas: hecho, interpretación y opción alternativa. Usá la tercera para proponer un paso pequeño.',
    close: '¿Cuál es la diferencia entre lo que pasó y lo que te dijiste sobre eso?'
  },
  4: {
    reading: 'No necesitás convertirte de un día para el otro en alguien que cree que todo es posible. Las ideas nuevas son más útiles cuando resultan creíbles y van acompañadas de acciones. En vez de repetirte “nunca tengo miedo”, podés probar “puedo avanzar con miedo y pedir apoyo”. Buscá una frase que te abra una posibilidad real.',
    prompts: ['Una idea sobre mí que hoy quiero revisar es…', 'Una creencia alternativa que sí puedo empezar a practicar es…', 'La acción que le dará sustento será…'],
    ritual: 'Escribí tu nueva frase en un lugar visible. Volvé a leerla antes de realizar la acción pequeña que elegiste.',
    close: '¿Qué hizo que esa nueva frase te resultara creíble?'
  },
  5: {
    reading: 'Agradecer no significa conformarte ni negar las dificultades. Es prestar atención a algo valioso que ya existe, incluso mientras seguís construyendo lo que deseás. Cuando la gratitud es específica, deja de ser una lista automática: recordás una conversación, una oportunidad, un descanso o un gesto concreto.',
    prompts: ['Hoy agradezco este momento preciso…', 'Fue importante para mí porque…', 'Quisiera expresar mi agradecimiento a…'],
    ritual: 'Elegí a una persona y agradecele un gesto concreto. Si no podés comunicarlo, escribilo para vos.',
    close: '¿Qué detalle habrías pasado por alto sin detenerte a observarlo?'
  },
  6: {
    reading: 'Dar puede ser una parte hermosa de tu identidad, pero no tiene que ser la única. Recibir un cumplido, ayuda o descanso también es una práctica de confianza. No hace falta devolver inmediatamente cada gesto ni justificar una necesidad. Hoy observá cómo respondés a lo bueno que llega a tu vida.',
    prompts: ['Algo que me cuesta recibir sin culpa es…', 'Cuando alguien me ayuda, suelo pensar…', 'Hoy me daré permiso para aceptar…'],
    ritual: 'Si recibís un elogio o un ofrecimiento apropiado, probá agradecer sin minimizarlo ni explicar por qué no lo merecés.',
    close: '¿Qué fue distinto al permitirte recibir?'
  },
  7: {
    reading: 'La primera semana no se mide por la cantidad de respuestas perfectas. Se mide por las veces que te detuviste a observarte y por las decisiones pequeñas que intentaste. Reconocer tus avances te permite ver evidencia de cambio, incluso si todavía quedan preguntas abiertas. Podés llevarte lo aprendido y volver a practicar lo que necesites.',
    prompts: ['Mi descubrimiento más importante fue…', 'Una acción pequeña de la que me siento orgullosa es…', 'Durante la próxima semana quiero seguir practicando…'],
    ritual: 'Releé tus primeras respuestas y escribí una carta breve a tu yo del día 1. Reconocé un esfuerzo y elegí un compromiso posible.',
    close: '¿Qué te gustaría recordar de esta primera semana?'
  }
};


// Semanas 2 y 3: prácticas originales, no diagnósticos ni promesas financieras.
export const laterWeeks = {
8: {reading:'A menudo heredamos frases sobre el dinero sin detenernos a elegir cuáles queremos conservar. No se trata de culpar a nuestra familia: sus ideas respondían a sus experiencias. Hoy vamos a distinguir entre lo aprendido, lo que hemos comprobado y lo que todavía podemos investigar.',prompts:['Una frase que escuché sobre el dinero fue…','Esa frase me ayuda cuando… y me limita cuando…','Una perspectiva que quiero explorar es…'],ritual:'Escribí una creencia heredada y contrastala con dos hechos de tu propia experiencia.',close:'¿Qué idea querés conservar y cuál preferís cuestionar?'},
9: {reading:'La claridad no elimina la incertidumbre, pero puede devolvernos margen de elección. Cuando todo parece urgente, detenerse a identificar una sola prioridad suele resultar más útil que hacer una lista interminable. En esta práctica elegís un asunto concreto y un siguiente paso realista.',prompts:['La situación que hoy necesito ordenar es…','Lo que sí depende de mí es…','El paso más pequeño que puedo tomar es…'],ritual:'Reservá diez minutos para ordenar una decisión en tres categorías: hoy, después y fuera de mi control.',close:'¿Qué cambió al separar lo urgente de lo importante?'},
10: {reading:'A veces esperar que los demás adivinen lo que necesitamos conduce al agotamiento y al resentimiento. Pedir no obliga a la otra persona a aceptar, pero nos permite expresarnos con honestidad. Practiquemos una petición específica, respetuosa y abierta a conversar.',prompts:['Una necesidad que me cuesta expresar es…','Temo que al decirlo suceda…','Puedo formular mi petición de esta manera…'],ritual:'Escribí o practicá en voz alta una petición que empiece por «Me ayudaría que…».',close:'¿Cómo fue reconocer tu necesidad sin pedir disculpas por sentirla?'},
11: {reading:'El merecimiento no es una cuenta que se salda a fuerza de cansancio. Hay esfuerzos importantes, pero también hay límites físicos, emocionales y materiales. Aprender a reconocerlos es parte de cuidarte. Hoy observaremos una regla interna que te exige más de lo razonable.',prompts:['Siento que debo esforzarme de más cuando…','La exigencia que aparece en mi mente es…','Un estándar más justo para esta situación sería…'],ritual:'Elegí una tarea y definí de antemano qué sería «suficientemente bien». Permitite terminar allí.',close:'¿Qué aprendiste sobre tu propia exigencia?'},
12: {reading:'Imaginar una vida diferente puede ayudarnos a formular objetivos, siempre que también reconozcamos nuestras condiciones reales. Una visualización útil no es una garantía: es una herramienta para aclarar aquello que valoramos y ensayar posibilidades.',prompts:['En un día más alineado con mis valores me gustaría…','Esa escena representa para mí el valor de…','Una parte pequeña que puedo practicar ahora es…'],ritual:'Escribí la escena de una mañana posible dentro de un mes y convertí un detalle en una acción concreta.',close:'¿Qué parte de esa imagen depende de una elección tuya?'},
13: {reading:'Tomar decisiones implica aceptar cierta incertidumbre. No necesitás conocer todos los resultados posibles para elegir un paso reversible y aprender. Una decisión consciente puede incluir información, límites, alternativas y la posibilidad de pedir apoyo.',prompts:['La decisión que he postergado es…','Lo que necesito saber antes de decidir es…','Un paso seguro y reversible sería…'],ritual:'Anotá dos opciones, un beneficio y un costo de cada una, y cuál es el próximo dato que necesitás.',close:'¿Qué información te ayudó a reducir la confusión?'},
14: {reading:'La abundancia también tiene que ver con disponer de tiempo, energía y tranquilidad. Decir que no a algo puede permitirte decir que sí a una prioridad. Un límite no necesita ser duro para ser firme.',prompts:['Un área donde mis límites se están desdibujando es…','Necesito proteger este tiempo o recurso…','Una frase breve y respetuosa que usaré es…'],ritual:'Ensayá una frase de límite: «Ahora no puedo comprometerme con eso». Elegí una situación apropiada para usarla.',close:'¿Qué sentiste al darte permiso para poner un límite?'},
15: {reading:'No existe una versión perfecta de vos esperando al final del recorrido. Tu identidad se expresa en tus decisiones cotidianas, incluso las pequeñas. Elegí una cualidad que quieras cultivar y buscá una conducta observable que la represente.',prompts:['Quiero ser una mujer que responde a los desafíos con…','Eso se vería en esta conducta concreta…','Una situación en la que puedo practicarlo es…'],ritual:'Elegí una palabra guía y escribí debajo una acción que puedas realizar hoy.',close:'¿Qué diferencia hay entre imaginar una cualidad y practicarla?'},
16: {reading:'Un hábito sostenible necesita espacio en la vida real. Comenzar con dos minutos puede parecer poco, pero permite descubrir cuándo, dónde y cómo sostener una acción. No buscamos una racha perfecta; buscamos aprender a regresar cuando nos interrumpimos.',prompts:['El hábito que quiero explorar es…','Lo haré después de… durante dos minutos','Si un día no puedo, mi forma de retomarlo será…'],ritual:'Probá la versión mínima de tu hábito. Anotá qué lo facilitó y qué lo complicó.',close:'¿Cómo se sintió empezar más pequeño de lo habitual?'},
17: {reading:'Las fortalezas no siempre aparecen en los grandes triunfos. También están en la paciencia con la que atravesaste una dificultad, en una conversación honesta o en la manera de resolver un problema. Encontrar ejemplos concretos ayuda a reconocer recursos propios.',prompts:['Una dificultad que atravesé fue…','Para responder utilicé esta capacidad…','Puedo aplicar esa fortaleza ahora en…'],ritual:'Hacé una lista de tres fortalezas acompañadas de una evidencia real para cada una.',close:'¿Qué capacidad estabas dando por sentada?'},
18: {reading:'Las relaciones cuidadas se construyen con escucha, respeto y límites. No podemos controlar lo que otra persona haga, pero sí podemos practicar claridad al expresar lo que sentimos y curiosidad por comprender lo que nos dicen.',prompts:['Una conversación que me importa es…','Me gustaría expresar lo siguiente…','También quiero escuchar y comprender…'],ritual:'Prepará una conversación usando «Cuando sucede… me siento… y me gustaría…», sin atribuir intenciones.',close:'¿Qué parte de una comunicación respetuosa está en tus manos?'},
19: {reading:'Abrirte a una oportunidad no significa aceptar cualquier oferta. Significa permitirte explorar con curiosidad y criterio, considerando tus recursos, valores y circunstancias. Hoy elegiremos una posibilidad sin convertirla en obligación.',prompts:['Una posibilidad que me interesa es…','Lo que necesitaría para evaluarla es…','Un primer paso de exploración sería…'],ritual:'Dedicá diez minutos a investigar una oportunidad y escribí una razón para avanzar y otra para esperar.',close:'¿Qué descubriste al mirar una posibilidad sin exigirte decidir hoy?'},
20: {reading:'Un objetivo amplio puede ser inspirador, pero un plan con acciones observables ayuda a llevarlo a la práctica. No necesitás diseñar todo el año. Hoy vas a seleccionar una prioridad para los próximos treinta días y una forma sencilla de revisar tu avance.',prompts:['Mi prioridad para el próximo mes es…','Tres acciones pequeñas que la acompañan son…','Revisaré mis avances en este momento…'],ritual:'Definí una meta concreta, tres acciones posibles y una fecha de revisión. Elegí un primer paso para mañana.',close:'¿Qué parte de tu plan te entusiasma y qué parte necesita simplificarse?'},
21: {reading:'Llegar al último día no significa haber resuelto todas las dudas. Significa que hiciste un espacio para observarte, reflexionar y ensayar nuevas decisiones. La práctica puede continuar con un ritmo que tenga sentido para vos. Hoy elegimos qué conservar y qué dejar ir.',prompts:['Lo que más aprendí de mí en estos 21 días fue…','La práctica que quiero seguir sosteniendo es…','Mi próximo paso amable y concreto será…'],ritual:'Leé tu primera reflexión, escribí una carta breve a tu yo de hace 21 días y elegí una acción para la semana próxima.',close:'¿Qué querés agradecerte al cerrar esta etapa?'}
};
export const allPractices = {...weekOne,...laterWeeks};

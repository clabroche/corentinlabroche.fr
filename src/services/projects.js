// @ts-ignore
const url = import.meta.url

export default {
  fractalsProjects: {
    label: 'Fractales',
    values: [{
    img: new URL('/img/fern.webp', url),
    header: 'Fougère de Barnsley',
    description: 'La fougère de Barnsley est une fractale nommée d\'après le mathématicien Michael Barnsley qui l\'a décrite pour la première fois dans son livre Fractals Everywhere.',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/barnsleyFern' },
      { type: 'globe', url: 'https://clabroche.github.io/barnsleyFern' },
    ]
  }, {
    img: new URL('/img/sierpinski.webp', url),
    header: 'Triangle de Sierpiński',
    description: 'Le triangle de Sierpiński, ou tamis de Sierpińsky, également appelé par Mandelbrot le joint de culasse de Sierpiński1, est une fractale, du nom de Wacław Sierpiński qui l\'a décrit en 19152.',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/sierpinski' },
      { type: 'globe', url: 'https://clabroche.github.io/sierpinski' },
    ]
  }, {
    img: new URL('/img/sandpile.webp', url),
    header: 'Abelian sandpile model',
    description: 'La pente s\'accumule lorsque des «grains de sable» (ou «copeaux») sont placés au hasard sur le tas, jusqu\'à ce que la pente dépasse une valeur seuil spécifique, moment auquel ce site s\'effondre, transférant du sable dans les sites adjacents, augmentant leur pente.',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/SandPile' },
    ]
  }]},
  
  android: {
    label: 'Applications mobiles',
    values: [{
    img: new URL('/img/rhea.webp', url),
    header: 'Rhea',
    description: 'Faites votre liste de courses, gérez votre inventaire, planifiez vos repas pour la semaine, importez une recette.',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/rhea' },
      { type: 'globe', url: 'https://rhea.corentinlabroche.fr/' },
      { type: 'android', url: 'https://rhea.corentinlabroche.fr/rhea.apk' },
    ]
  }, {
    img: new URL('/img/dice.webp', url),
    header: 'Random app',
    description: 'Randomisez un ensemble de mots ou cliquez sur un dé pour obtenir un nombre. Conçu pour une utilisation sur mobile.',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/randomapp/' },
      { type: 'globe', url: 'https://randomapp.corentinlabroche.fr' },
      { type: 'android', url: 'https://randomapp.corentinlabroche.fr/randomapp.apk' },
    ]
  }]},
  
  cli: {
    label: 'Ligne de commande ou librairies',
    values: [{
    img: new URL('/img/objectvalidity.webp', url),
    header: 'Object-validity',
    description: 'Valider un objet JS ou json par rapport à un schéma',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/object-validity' },
      { type: 'npm', url: 'https://www.npmjs.com/package/@iryu54/object-validity' },
    ]
  }, {
    img: new URL('/img/gitmanagerjs.webp', url),
    header: 'Gitmanagerjs',
    description: 'Ce module vise à utiliser git programmatiquement car la ligne de commande renvoie certains succès dans stderr.',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/GitManager.js' },
      { type: 'npm', url: 'https://www.npmjs.com/package/gitmanagerjs' },
    ]
  }, {
    img: new URL('/img/pdffigureextractor.webp', url),
    header: 'Pdf-figure-extractor',
    description: 'Extraire des figures d\'un pdf sans texte',
    links: [
      { type: 'github', url: 'https://github.com/Inist-CNRS/pdf-figure-extractor' },
      { type: 'npm', url: 'https://www.npmjs.com/package/pdf-figure-extractor' },
    ]
  }, {
    img: new URL('/img/fbterm.webp', url),
    header: 'Fbterm',
    description: 'Utiliser Facebook Messenger dans un terminal',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/fbTerm' },
      { type: 'npm', url: 'https://www.npmjs.com/package/@iryu54/fbterm' },
    ]
  }, {
    img: new URL('/img/nmsjs.webp', url),
    header: 'Nms-js',
    description: 'Décrypter toutes les commandes non cryptés',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/nms-js' },
      { type: 'npm', url: 'https://www.npmjs.com/package/@iryu54/nmsjs' },
    ]
  }]},
  
  games: {
    label: 'Jeux',
    values: [{
    img: new URL('/img/minesweeper.webp', url),
    header: 'Minesweeper',
    description: 'L\'objectif du jeu est de désamorcer un plateau rectangulaire contenant des «mines» cachées sans faire exploser aucune d\'entre elles, à l\'aide d\'indices sur le nombre de mines voisines dans chaque champ',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/minesweeper' },
      { type: 'globe', url: 'http://corentinlabroche.fr:9090/games' },
    ]
  }, {
    img: new URL('/img/motsMeles.webp', url),
    header: 'MotsMeles',
    description: 'Trouvez tous les mots dans une grille pleine de lettres.',
    links: [
      { type: 'github', url: 'https://clabroche.github.io/motsMeles/' },
      { type: 'globe', url: 'https://clabroche.github.io/motsMeles/' },
    ]
  }]},
  
  webPOC: {
    label: 'Preuves de concept',
    values: [{
    img: new URL('/img/particles.webp', url),
    header: 'Particle',
    description: 'Affichez des particules dans un canvas.',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/particle' },
      { type: 'globe', url: 'https://clabroche.github.io/particle' },
    ]
  }, {
    img: new URL('/img/rain.webp', url),
    header: 'Rain',
    description: 'Affichez de la pluie dans un canvas.',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/rain' },
      { type: 'globe', url: 'https://clabroche.github.io/rain/' },
    ]
  }]},
  
  web: {
    label: 'Web',
    values: [{
    img: new URL('/img/stackmonitor.webp', url),
    header: 'Stack monitor',
    description: 'Gérez et assemblez vos microservices à un seul et même endroit. Il vous suffit de décrire votre stack avec une config et de lancer ce package pour les lancer en parrallèle',
    links: [
      { type: 'github', url: 'https://github.com/clabroche/stack-monitor' },
      { type: 'npm', url: 'https://www.npmjs.com/package/@iryu54/stack-monitor' },
    ]
  }]},
}
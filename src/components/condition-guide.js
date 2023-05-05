export function conditionGuide() {
  return {
    conditions: [
      {
        image: new URL('../img/nm.png', import.meta.url),
        name: 'Near Mint (NM)',
        description: 'Near Mint condition cards show minimal or no wear from play or handling and will have an unmarked surface, crisp corners, and otherwise pristine edges outside of minimal handling. Near Mint condition cards appear "fresh out of the pack," with edges and surfaces virtually free from all flaws. '
      },
      {
        image: new URL('../img/lp.png', import.meta.url),
        name: 'Lightly Played (LP)',
        description: 'Lightly Played condition cards can have slight border or corner wear, or possibly minor scratches. No major defects are present, and there are less than 4 total flaws on the card. Lightly Played condition foils may have slight fading or indications of wear on the card face.'
      },
      {
        image: new URL('../img/mp.png', import.meta.url),
        name: 'Moderately Played (MP)',
        description: 'Moderately Played condition cards have moderate wear, or flaws apparent to the naked eye. Moderately Played condition cards can show moderate border wear, mild corner wear, water damage, scratches , creases or fading, light dirt buildup, or any combination of these defects.'
      },
      {
        image: new URL('../img/hp.png', import.meta.url),
        name: 'Heavily Played (HP)',
        description: 'Heavily Played condition cards exhibit signs of heavy wear. Heavily Played condition cards may include cards that have significant creasing, folding, severe water damage, heavy whitening, heavy border wear, and/or tearing.'
      },
      {
        image: new URL('../img/dmgd.png', import.meta.url),
        name: 'Damaged (D)',
        description: 'Damaged condition cards show obvious tears, bends, or creases that could make the card illegal for tournament play, even when sleeved. Damaged condition cards have massive border wear, possible writing or major inking (ex. white-bordered cards with black-markered front borders), massive corner wear, prevalent scratching, folds, creases or tears.'
      }
    ]
  }
}
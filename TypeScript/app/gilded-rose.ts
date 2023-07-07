export const ITEM = {
  NAME: {
    AGED_BRIE: "Aged Brie",
    SULFURAS: "Sulfuras",
    BACKSTAGE_PASSES: "Backstage passes",
    CONJURED: "Conjured",
  },
  SELL_IN: {
    MIN: 0,
    UNIT: -1,
  },
  QUALITY: {
    MIN: 0,
    MAX: 50,
    UNIT: -1,
  },
};

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor({
    name,
    sellIn,
    quality,
  }: {
    name: string;
    sellIn: number;
    quality: number;
  }) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  constructor(public items: Item[] = []) {}

  // 매일 호출하는 메소드라는 가정.
  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === ITEM.NAME.SULFURAS) {
        return;
      }

      const quality = getQuality(item);

      item.sellIn = Math.max(item.sellIn + ITEM.SELL_IN.UNIT, ITEM.SELL_IN.MIN);
      item.quality = Math.max(
        ITEM.QUALITY.MIN,
        Math.min(item.quality + quality, ITEM.QUALITY.MAX)
      );
    });

    return this.items;
  }
}

const getQuality = (item: Item): number => {
  if (item.name === ITEM.NAME.CONJURED) {
    if (item.sellIn === 0) return ITEM.QUALITY.UNIT * 2 * 2;

    return ITEM.QUALITY.UNIT * 2;
  }

  if (item.name === ITEM.NAME.AGED_BRIE) {
    if (item.sellIn === 0) return -ITEM.QUALITY.UNIT * 2;

    return -ITEM.QUALITY.UNIT;
  }

  if (item.name === ITEM.NAME.BACKSTAGE_PASSES) {
    if (item.sellIn === 0) {
      return -ITEM.QUALITY.MAX;
    }

    if (item.sellIn <= 5) {
      return -ITEM.QUALITY.UNIT * 3;
    }

    if (item.sellIn <= 10) {
      return -ITEM.QUALITY.UNIT * 2;
    }

    return -ITEM.QUALITY.UNIT;
  }

  if (item.sellIn === 0) return ITEM.QUALITY.UNIT * 2;

  return ITEM.QUALITY.UNIT;
};

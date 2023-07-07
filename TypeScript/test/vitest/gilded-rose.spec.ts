import { Item, GildedRose, ITEM } from "@/gilded-rose";

const context = describe;

describe("Gilded Rose", () => {
  context("기본 아이템을 판매할 때", () => {
    it("하루가 지나면 SellIn과 Quality값은 1씩 감소한다.", () => {
      const item = new Item({ name: "sex", quality: 50, sellIn: 10 });
      const gildedRose = new GildedRose([item]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(49);
    });
  });

  it("판매 일수가 없어지면, Quality값은 2씩 감소한다.", () => {
    const item = new Item({ name: "sex", quality: 50, sellIn: 3 });
    const gildedRose = new GildedRose([item]);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(45);
  });

  context("Aged Brie를 판매할 때", () => {
    it("시간이 지날수록 Quality의 값이 올라간다.", () => {
      const item = new Item({
        name: ITEM.NAME.AGED_BRIE,
        quality: 40,
        sellIn: 10,
      });
      const gildedRose = new GildedRose([item]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(41);
    });

    it("Quality값은 50을 초과할 수 없다.", () => {
      const item = new Item({
        name: ITEM.NAME.AGED_BRIE,
        quality: 45,
        sellIn: 10,
      });
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(50);
    });
  });

  context("백스테이지 입장권을 판매할 때", () => {
    it("하루가 지나면 Quality는 1만큼 상승한다.", () => {
      const item = new Item({
        name: ITEM.NAME.BACKSTAGE_PASSES,
        sellIn: 15,
        quality: 40,
      });
      const gildedRose = new GildedRose([item]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(14);
      expect(items[0].quality).toBe(41);
    });

    it("sellIn이 10일부터는 매일 2씩 증가한다.", () => {
      const item = new Item({
        name: ITEM.NAME.BACKSTAGE_PASSES,
        sellIn: 10,
        quality: 40,
      });
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(46);
    });

    it("sellIn이 5일부터는 매일 3씩 증가한다.", () => {
      const item = new Item({
        name: ITEM.NAME.BACKSTAGE_PASSES,
        sellIn: 5,
        quality: 40,
      });
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(2);
      expect(items[0].quality).toBe(49);
    });

    it("sellIn이 0일이 되면 quality가 0이 된다.", () => {
      const item = new Item({
        name: ITEM.NAME.BACKSTAGE_PASSES,
        sellIn: 3,
        quality: 40,
      });
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(0);
    });
  });

  context("마법에 걸린 상품을 판매할 때", () => {
    it("quality가 2씩 낮아진다", () => {
      const item = new Item({
        name: ITEM.NAME.CONJURED,
        sellIn: 10,
        quality: 40,
      });
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(8);
      expect(items[0].quality).toBe(36);
    });
  });
});

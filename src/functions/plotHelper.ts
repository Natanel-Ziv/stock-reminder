import * as fs from 'fs';
import * as _ from 'lodash';
import type {RecommendationTrends} from '@stoqey/finnhub';
import {PLOTLY_KEY, PLOTLY_USERNAME} from '../framework/environment';

const plotly = require('plotly')(PLOTLY_USERNAME, PLOTLY_KEY);

export const createRecommendationImg = (recommendations: RecommendationTrends[]): Promise<boolean> => {
  return new Promise(resolve => {
    const strongBuy = {
      x: _.map(recommendations, 'period'),
      y: _.map(recommendations, 'strongBuy'),
      name: 'Strong Buy',
      type: 'bar'
    };

    const buy = {
      x: _.map(recommendations, 'period'),
      y: _.map(recommendations, 'buy'),
      name: 'buy',
      type: 'bar'
    };

    const hold = {
      x: _.map(recommendations, 'period'),
      y: _.map(recommendations, 'hold'),
      name: 'hold',
      type: 'bar'
    };

    const sell = {
      x: _.map(recommendations, 'period'),
      y: _.map(recommendations, 'sell'),
      name: 'sell',
      type: 'bar'
    };

    const strongSell = {
      x: _.map(recommendations, 'period'),
      y: _.map(recommendations, 'strongSell'),
      name: 'strongSell',
      type: 'bar'
    };

    const data = [strongBuy, buy, hold, sell, strongSell];
    const layout = {
      title: recommendations[0].symbol,
      font: {
        size: 50
      },
      legend: {
        font: {
          size: 70
        }
      },
      barmode: 'stack'
    };

    const chart = {
      data,
      layout
    };

    const imgOpts = {
      format: 'png',
      width: 5000,
      height: 2500
    };

    plotly.getImage(chart, imgOpts, (err: any, imageStream: any) => {
      if (err) {
        console.log(err);

        return;
      }
      const fileStream = fs.createWriteStream('assets/plot.png');

      imageStream.pipe(fileStream);
      fileStream.on('finish', () => {
        resolve(true);
      });
    });
  });
};
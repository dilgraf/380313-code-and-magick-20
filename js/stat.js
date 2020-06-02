'use strict';

// СТАТИСТИКА
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP = 20; // расстояние от CLOUD_X до текста
var TEXT_HEIGHT = 18;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_Y = CLOUD_Y + (GAP + TEXT_HEIGHT) * 2;
var BAR_GAP = 50;
var YOUR_COLOR = 'rgba(255, 0, 0, 1)';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getColor = function (name) {
  var othersColor = 'hsl(240,' + Math.floor(Math.random() * 101) + '%, 50%';
  return (name === 'Вы') ? YOUR_COLOR : othersColor;
};

// функция является методом window, принимает контекст канваса
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - 30);

    var newBarHeight = times[i] * BAR_HEIGHT / maxTime;
    var deltaHeight = BAR_HEIGHT - newBarHeight;
    ctx.fillStyle = getColor(names[i]);
    ctx.fillRect(CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i, BAR_Y + deltaHeight, BAR_WIDTH, newBarHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i, BAR_Y + deltaHeight - GAP);
  }
};

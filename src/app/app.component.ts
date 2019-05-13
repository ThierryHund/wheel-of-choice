import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as anime from 'animejs';

const spinning: number =  1000 + Math.random() * 1000;

function randomizeAnimation() {
  return  {
    transform: `rotate(${spinning}deg)`,
  };
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title: string = 'wheel-of-choice';
  spin: boolean = false;
  element: any;
  rotation: number = 0;
  center: number;
  width: number;
  sliceDeg: number;
  rectColor: string = '#FF0000';
  ctx: CanvasRenderingContext2D;
  color: string[] = ['#ca7', '#7ac', '#77c', '#aac', '#a7c', '#ac7', '#caa'];
  label: string[] = ['Sushi', 'Ramen', 'Italia', 'Europa', 'Burger', 'Healthy', 'Street food'];
  choice: string = null;
  choosen: boolean = false;
  @ViewChild('myCanvas') myCanvas;

  ngAfterViewInit() {
    window.addEventListener('resize', this.resize, false);
    let vw = 700 * 0.01;
    if (window.innerWidth < 700) {
      vw = window.innerWidth * 0.01;
    }
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vw', `${vw}px`);

    const canvas = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    const slices   = this.color.length;
    this.sliceDeg = 360 / slices;
    let deg      = 0;
    this.width  = canvas.width; // size
    this.center = this.width / 2;      // center

    for ( let i = 0; i < slices; i++) {
      this.drawSlice(deg, this.color[i]);
      this.drawText(deg + this.sliceDeg / 2, this.label[i]);
      // this.drawBullet(deg);
      deg += this.sliceDeg;
    }

    this.ctx.beginPath();
    this.ctx.arc(this.center, this.center, 10, 0 , 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();

    this.drawExternalBorder();

    for ( let i = 0; i <= slices; i++) {
      this.drawBullet(this.sliceDeg * i);
    }
    this.tick();
  }

  resize() {
    let vw = 700 * 0.01;
    if (window.innerWidth < 700) {
      vw = window.innerWidth * 0.01;
    }
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  }

  deg2rad( deg ) { return deg * Math.PI / 180; }

  drawSlice(deg, color) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.moveTo(this.center, this.center);
    // radius is ((this.width / 2) - 6) and not (this.width / 2) because we need place for the external bullet
    this.ctx.lineWidth = 5;
    this.ctx.arc(this.center, this.center, (this.width / 2) - 8, this.deg2rad(deg), this.deg2rad(deg + this.sliceDeg));
    this.ctx.lineWidth = 5;
    this.ctx.lineTo(this.center, this.center);
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawExternalBorder() {
    this.ctx.moveTo(this.width - 8, this.center);
    this.ctx.beginPath();
    // this.ctx.arc(this.center, this.center, (this.width / 2) - 6, this.deg2rad(0), this.deg2rad(360));
    this.ctx.lineTo(this.width - 8, this.center);
    // this.ctx.arc(this.center, this.center, (this.width / 2) - 12, this.deg2rad(0), this.deg2rad(360));
    this.ctx.lineTo(this.width - 12, this.center);
    this.ctx.fillStyle = 'black';
    this.ctx.stroke();
  }

  drawBullet(deg) {
    this.ctx.lineWidth = 5;
    const x = this.center + (((this.width / 2) - 8) * Math.cos(this.deg2rad(deg)));
    const y = this.center + (((this.width / 2) - 8) * Math.sin(this.deg2rad(deg)));
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0 , 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawText(deg, text) {
    this.ctx.save();
    this.ctx.translate(this.center, this.center);
    this.ctx.rotate(this.deg2rad(deg));
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '30px Modak cursive';
    this.ctx.fillText(text, 200, 10);
    this.ctx.restore();
  }

  tick() {
  requestAnimationFrame(() => {
    this.tick();
  });
}

animate() {
  this.choice = null;
  this.choosen = false;
  this.rotation += Math.random() * 10,
  this.element = anime({
    targets: '.wheel',
    rotate: {
      value: this.rotation + 'turn',
      duration: 1800,
      easing: 'easeInOutSine'
    },
    complete: (anim) => {
      setTimeout(() => {
        this.choosen = true;
      }, 1000 );
    }
  });

  this.element = anime({
    targets: '#canvas',
    rotate: {
      value: this.rotation + 'turn',
      duration: 1800,
      easing: 'easeInOutSine'
    }
  });

  const rot = this.rotation - Math.round(this.rotation);
  const turn = ((0.75 - rot) / ( 1 / this.label.length)) - 1;
  const turnIndex = turn > this.label.length ? turn - 7 : turn;
  this.choice = Math.ceil(turnIndex) === 7 ? this.label[0] : this.label[Math.ceil(turnIndex)];
}

}

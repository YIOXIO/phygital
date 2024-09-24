import { parse } from 'svg-parser';

const container = document.getElementById('svg-container');

const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS, 'svg');
svg.setAttribute('viewBox', '0 0 380 180');

const path = document.createElementNS(svgNS, 'path');
path.setAttribute('fill-rule', 'evenodd');
path.setAttribute('clip-rule', 'evenodd');
path.setAttribute('d', 'M252.778 37.1967c0-20.3222-16.474-36.796798-36.797-36.796798H111.99c-20.322 0-36.7966 16.474598-36.7966 36.796798 0 20.3222-16.4746 36.7967-36.7968 36.7967h-.7999C16.8326 73.9934 0 90.8261 0 111.59v31.197c0 22.09 17.9071 39.997 39.9965 39.997H339.17c22.089 0 39.997-17.907 39.997-39.997V113.99c0-22.0895-17.908-39.9966-39.997-39.9966h-49.595c-20.323 0-36.797-16.4745-36.797-36.7967Z');
path.setAttribute('fill', '#E7ECFF');

svg.appendChild(path);
container.appendChild(svg);
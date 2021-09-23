import { templateJitUrl } from '@angular/compiler';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css']
  
})
export class DangnhapComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
  function()  {
var signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton?.addEventListener('click', () => {
	 container?.classList.add("right-panel-active");
});

signInButton?.addEventListener('click', () => {
	container?.classList.remove("right-panel-active");
});

    
  }}


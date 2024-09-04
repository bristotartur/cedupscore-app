import { Component, HostListener, OnInit } from '@angular/core';
import { NavItemComponent } from '../nav-item/nav-item.component';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    NavItemComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  title = 'Cedupscore';
  isMenuOpen = false;
  screenWidth!: number;
  currentItem!: { name: string, iconClass: string };

  navItems = [
    { name: 'Geral', iconClass: 'fa-solid fa-house', link: '/', isSelected: true },
    { name: 'Placar', iconClass: 'fa-solid fa-medal', link: '/placares', isSelected: false },
    { name: 'Tarefas', iconClass: 'fa-solid fa-list-check', link: '/tarefas', isSelected: false },
    { name: 'Esportes', iconClass: 'fa-solid fa-volleyball', link: '/esportes', isSelected: false },
    { name: 'Membros', iconClass: 'fa-solid fa-person', link: '/membros', isSelected: false },
    { name: 'Recursos', iconClass: 'fa-solid fa-exclamation', link: '/recursos', isSelected: false }
  ];

  constructor(private router: Router) {  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.router.events.subscribe(() => {
      this.updateSelectedItem(this.router.url);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth > 768 && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectItem(index: number): void {
    this.navItems.forEach((item, i) => {
      item.isSelected = (i == index);
      
      if (item.isSelected) {
        this.currentItem = { name: item.name, iconClass: item.iconClass };
      }
      this.isMenuOpen = false;
    });
  }

  updateSelectedItem(url: string): void {
    const index = this.navItems
      .findIndex(item => item.link == url);

    this.selectItem(index != -1 ? index : 0);
  }

}
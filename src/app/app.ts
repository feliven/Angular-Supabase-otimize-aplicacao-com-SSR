import { Component, inject, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { SupabaseService } from './shared/services/supabase.service';
import type { Product } from './shared/types/types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  supabaseService = inject(SupabaseService);

  products: Product[] = [];

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    const { data, error } = await this.supabaseService.getProducts();
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      this.products = data;
      console.table(this.products);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { CategManagerService, ICategory } from '../../providers/categ-manager.service';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.css']
})
export class CategoryTreeComponent implements OnInit {
  categs: any;
  constructor(private categManagerService: CategManagerService, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.categManagerService.getCategsByParentId('').subscribe((res) => {
      this.categs = res.map((c) => {
        return {
          ...c.payload.doc.data(),
          id: c.payload.doc.id
        } as ICategory;
      });
    });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategManagerService, ICategory } from '../../providers/categ-manager.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  @Input()
  public categ: ICategory;
  @Input()
  public isRoot: boolean;
  @Output()
  public subCategoryDeleted: EventEmitter<string> = new EventEmitter<string>();
  public expandAll: boolean;
  public categs: ICategory[];
  editMode: boolean;

  constructor(private categManagerService: CategManagerService) {}

  ngOnInit(): void {
    this.expandAll = this.categ.childrenNo && !this.isRoot;
    this.getSubCategs();
  }

  private getSubCategs(): void {
    if (this.categ.childrenNo && this.expandAll) {
      this.categManagerService.getCategsByParentId(this.categ.id).subscribe((res) => {
        this.categs = res.map((c) => {
          return {
            ...c.payload.doc.data(),
            id: c.payload.doc.id
          } as ICategory;
        }).sort((a, b) => a.showOrder - b.showOrder);
      });
    }
  }

  openChildren(): void {
    if (this.categ.childrenNo) {
      this.expandAll = !this.expandAll;
      this.getSubCategs();
    }
  }

  deleteCateg(): void {
    this.categManagerService.deleteCateg(this.categ.id).then(() => {
      this.subCategoryDeleted.emit(this.categ.id);
    });
  }

  updateChildNumer(val: number): void {
    this.categ.childrenNo = this.categ.childrenNo + val;
    this.categManagerService.updateCateg(this.categ);
  }

  saveChanges(): void {
    this.categManagerService.updateCateg(this.categ).finally(() => {
      this.editMode = !this.editMode;
    });
  }

  drop($event: CdkDragDrop<any, any>): void {
    const coCateg = this.categs.splice($event.previousIndex, 1);
    this.categs.splice($event.currentIndex, 0, ...coCateg);
    this.categs.forEach((categ, idx) => {
      categ.showOrder = idx;
      this.categManagerService.updateCateg(categ).then(c => console.log('updated', c));
    });
  }
}

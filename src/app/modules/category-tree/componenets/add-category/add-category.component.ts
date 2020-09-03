import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategManagerService, ICategory } from '../../providers/categ-manager.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public form: FormGroup;
  @Input()
  public parentId: string;
  @Input()
  public showOrder: number;
  @Output()
  public subCategoryAdded: EventEmitter<string> = new EventEmitter<string>();
  public inProccess = false;

  constructor(private fb: FormBuilder, private categManagerService: CategManagerService) { }

  ngOnInit(): void {
    this.buildForm(null);
  }
  buildForm(categ: ICategory): void {
    this.form = this.fb.group({
      name: [categ ? categ.name : '', Validators.required],
      parentId: [categ ? categ.parentId : this.parentId],
      childrenNo: [categ ? categ.childrenNo : 0],
      showOrder: [categ ? categ.showOrder : this.showOrder]
    });
  }

  addUpdateCateg(): void {
    this.inProccess = true;
    this.categManagerService.addCateg(this.form.value).then((doc) => {
      console.log('added', doc);
      this.subCategoryAdded.emit(doc.id);
    }).catch((err) => {
      console.log('err', err);
    }).finally(() => {
      this.inProccess = false;
    });
  }
}

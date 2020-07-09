import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandEditionComponent } from './brand-edition.component';

describe('BrandEditionComponent', () => {
  let component: BrandEditionComponent;
  let fixture: ComponentFixture<BrandEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

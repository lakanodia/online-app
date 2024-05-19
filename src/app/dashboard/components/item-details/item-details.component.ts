import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailsService } from '../../services/item-details.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent  implements OnInit {
  item: any;
   constructor(private route: ActivatedRoute, private itemDetailService: ItemDetailsService){

   }

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      const itemId = params['id'];
      this.getItemDetails(itemId);
    });
  }

  getItemDetails(itemId: string): void {
    this.itemDetailService.getItemById(itemId).subscribe((item: any) => {
      this.item = item;
    });
  }
}

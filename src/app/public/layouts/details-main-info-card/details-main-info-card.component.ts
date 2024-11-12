import { Component, Input } from '@angular/core';
import { DatetimeHelper } from '../../../_core/helpers/datetime.helper';
import { Images } from '../../../../assets/data/images';
import { ProductData } from '../../../models/product';
import { CurrencyPipe, DecimalPipe, NgClass, NgFor, NumberFormatStyle } from '@angular/common';
import { StarScoreComponent } from './star-score';
import { SelectComponent } from '../../../shared/components/select/select';


@Component({
  selector: 'details-main-info-card',
  standalone: true,
  imports: [NgFor, NgClass, StarScoreComponent, SelectComponent, DecimalPipe],
  templateUrl: './details-main-info-card.component.html',
  styleUrl: './details-main-info-card.component.css',
})
export class DetailsMainInfoCardComponent {
 
  @Input() product!: ProductData
  qtyData = [1,2,3,4,5]
}

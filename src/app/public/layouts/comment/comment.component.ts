import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatetimeHelper } from '../../../_core/helpers/datetime.helper';
import { Images } from '../../../../assets/data/images';
import { Comment, CommentHeader } from '../../../models/comments';
import { StarScoreComponent } from '../details-main-info-card/star-score';


@Component({
  selector: 'commets',
  standalone: true,
  imports: [StarScoreComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
 
  @Input() comments!: Comment[]
  
}
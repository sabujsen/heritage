import { Item } from './../shared/item.model';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'titlesearch' })
export class SearchPipe implements PipeTransform {
  transform(items: Item[], searchText: any): any {
    if(searchText == null) return items;

    return items.filter(function(item){
      return item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}

import { AlpineComponent } from 'alpinejs';
import { PaginationModel, PaginationParams } from './pagination.model';

interface PaginationData {
  pagination: PaginationModel;
  hidden: boolean;
  update(params: PaginationParams): void;
  updateStatus(): void;
}

export default function pagination(): AlpineComponent<PaginationData> {
  return {
    pagination: null,
    hidden: true,

    init() {
      this.pagination = new PaginationModel(() => { this.updateStatus() });
    },

    update(params: PaginationParams) {
      this.pagination.update(params);
    },

    updateStatus() {
      this.hidden = this.pagination?.pages.length < 2;
    }
  }
}

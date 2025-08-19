export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  itemsCount: number;
  maxPages: number;
}

export class PaginationPage {
  private _selectedPage: number;

  constructor(pageNumber: number, selectedPage: number, showFirstGapMarker: boolean, showLastGapMarker: boolean) {
    this.pageNumber = pageNumber;
    this.showFirstGapMarker = showFirstGapMarker;
    this.showLastGapMarker = showLastGapMarker;

    this._selectedPage = selectedPage;
  }

  public pageNumber: number;
  public showFirstGapMarker: boolean;
  public showLastGapMarker: boolean;

  public get isSelected() {
    return this.pageNumber == this._selectedPage;
  }

  public get href() {
    return `?page=${this.pageNumber}`;
  }
}

export class PaginationModel {
  private readonly _updateStatus: CallableFunction;

  private _pageCount: number;
  private _startOfSubsection: number;
  private _maxPages: number;
  private _selectedPage: number;

  public pages: PaginationPage[];

  constructor(updateStatus: CallableFunction) {
    this._updateStatus = updateStatus;
  }

  public update(params: PaginationParams) {
    this._selectedPage = params.pageNumber;
    if (this._selectedPage < 1) {
      this._selectedPage = 1;
    }

    this._pageCount = params.pageSize ? Math.ceil(params.itemsCount / params.pageSize) : 0;
    this._maxPages = params.maxPages;

    this.pages = [];

    this._startOfSubsection = Math.max(1, (this._maxPages - 1) * Math.floor(this._selectedPage / (this._maxPages - 1)));
    if (this._selectedPage == this._pageCount && this._selectedPage == this._startOfSubsection) {
      this._startOfSubsection = Math.max(1, this._pageCount - this._maxPages);
    }
    if (this._selectedPage == this._startOfSubsection + (this._maxPages - 1)) {
      this._startOfSubsection = this._selectedPage;
    }
    if (this._pageCount - this._startOfSubsection < this._maxPages) {
      this._startOfSubsection = Math.max(1, this._pageCount - this._maxPages);
    }

    const showFirstGapMarker = this._startOfSubsection > 1;
    if (showFirstGapMarker) {
      this.pages.push(new PaginationPage(1, this._selectedPage, true, false));
    }
    for (let index = 0; index < this._maxPages && this._startOfSubsection + index < this._pageCount; index++) {
      this.pages.push(new PaginationPage(this._startOfSubsection + index, this._selectedPage, false, false));
    }
    const showLastGapMarker = this.pages[this.pages.length - 1]?.pageNumber < this._pageCount - 1;
    this.pages.push(new PaginationPage(this._pageCount, this._selectedPage, false, showLastGapMarker));

    this._updateStatus();
  }
}

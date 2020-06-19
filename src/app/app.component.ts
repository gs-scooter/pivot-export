import { Component, OnInit, ViewChild } from '@angular/core';
import {
    IDataOptions, PivotView, FieldListService, CalculatedFieldService,
    ToolbarService, ToolbarItems, DisplayOption, IDataSet, VirtualScrollService,
    ToolbarArgs
} from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { Button } from '@syncfusion/ej2-buttons';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [CalculatedFieldService, ToolbarService, FieldListService]
})
export class AppComponent {
  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;
  public toolbarOptions: ToolbarItems[];
  public displayOption: DisplayOption;
  public chartSettings: ChartSettings;

  @ViewChild('pivotview')
  public pivotObj: PivotView;

  ngOnInit(): void {
    this.gridSettings = {
      columnWidth: 140
    } as GridSettings;

      this.chartSettings = {
            title: 'Sales Analysis',
            chartSeries: { type: 'Column' },
        } as ChartSettings;

    this.toolbarOptions = [
          'FieldList',
    'New',
    'Save',
    'SaveAs',
    'Rename',
    'Load',
    'GrandTotal',
    'Formatting',
    'Export'
    ] as ToolbarItems[];

    this.displayOption = { view: 'Table' } as DisplayOption;

    this.dataSourceSettings = {
      values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
      { name: 'Amount', caption: 'Sold Amount' }],
      formatSettings: [{ name: 'Amount', format: 'C' }],
      columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
      dataSource: Pivot_Data,
      rows: [{ name: 'Country' }, { name: 'Products' }],
      filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
      expandAll: true,
    };

  }

  onToolbarRender(args: ToolbarArgs): void {
    args.customToolbar[0].align = 'Left';
    args.customToolbar.splice(1, 0, {
      type: 'Separator'
    });
    args.customToolbar.splice(7, 0, {
      type: 'Separator'
    });

    args.customToolbar.splice(7, 0, {
      prefixIcon: 'e-pivotview-expand',
      tooltipText: 'Toggle Expand/Collapse',
      click: this.toggleExpandCollapse.bind(this)
    });
  }


  private toggleExpandCollapse(): void {
    this.dataSourceSettings.drilledMembers = [];
    this.dataSourceSettings.expandAll = !this.dataSourceSettings.expandAll;
  }

}

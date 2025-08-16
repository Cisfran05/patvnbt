KJE.CapitalCalc=function(){this.TARGET_WORKING_CAPITAL=0;
this.MONTHS_OF_ANALYSIS=12;
this.WORKING_CAPITAL_CHANGE="";
this.WORKING_CAPITAL_DIFF=0;
this.MSG_UP=KJE.parameters.get("MSG_UP","You may need to increase your working capital KJE1.");
this.MSG_DOWN=KJE.parameters.get("MSG_DOWN","You may be able to decrease your working capital KJE1.");
this.MSG_SAME=KJE.parameters.get("MSG_SAME","Your current working capital of KJE1 appears on target.");
this.sSchedule=new KJE.Repeating()
};
KJE.CapitalCalc.prototype.clear=function(){this.TOTAL_CURRENT_ASSETS=0;
this.TOTAL_CURRENT_LIABILITIES=0;
this.ANNUAL_DESIRED_GROWTH=0;
this.TARGET_CURRENT_RATIO=0
};
KJE.CapitalCalc.prototype.calculate=function(s){var A=KJE;
var n=this.TOTAL_CURRENT_ASSETS;
var D=this.TOTAL_CURRENT_LIABILITIES;
var t=this.ANNUAL_DESIRED_GROWTH;
var v=this.TARGET_CURRENT_RATIO;
var C=0;
var z=n/D;
var u=n-D;
var w=KJE.ROR_MONTH(t/100);
var r=D*v;
this.TARGET_WORKING_CAPITAL=this.getWorking(0,w,r,D);
this.WORKING_CAPITAL_DIFF=this.TARGET_WORKING_CAPITAL-u;
if(this.WORKING_CAPITAL_DIFF>1){this.WORKING_CAPITAL_CHANGE=KJE.getKJEReplaced(this.MSG_UP,A.dollars(this.WORKING_CAPITAL_DIFF))
}else{if(this.WORKING_CAPITAL_DIFF<1){this.WORKING_CAPITAL_CHANGE=KJE.getKJEReplaced(this.MSG_DOWN,A.dollars(this.WORKING_CAPITAL_DIFF*-1))
}else{this.WORKING_CAPITAL_CHANGE=this.WORKING_CAPITAL_CHANGE=KJE.getKJEReplaced(this.MSG_SAME,A.dollars(u));
this.WORKING_CAPITAL_DIFF=0
}}var i=Math.round(this.MONTHS_OF_ANALYSIS);
var x=0;
this.WC_MONTH=KJE.FloatArray(i);
this.cats=KJE.FloatArray(i);
if(s){var y=this.sSchedule;
y.clearRepeat();
y.addHeader(y.sReportCol("&nbsp;",1),y.sReportCol("Current Assets*",2),y.sReportCol("Current Liabilities",3),y.sReportCol("Working Capital",4));
y.addRepeat(" ",A.dollars(r),A.dollars(D),A.dollars(this.TARGET_WORKING_CAPITAL))
}for(var B=1;
B<=i;
B++){x=B-1;
this.cats[x]=""+B;
this.WC_MONTH[x]=this.getWorking(B,w,r,D);
if(s){y.addRepeat(B,A.dollars(KJE.FV_AMT(w,B,r)),A.dollars(KJE.FV_AMT(w,B,D)),A.dollars(this.WC_MONTH[x]))
}}this.ACTUAL_CURRENT_RATIO=z;
this.ACTUAL_WORKING_CAPITAL=u;
this.MONTHLY_GROWTH_RATE=w;
this.TARGET_WORKING_CAPITAL_END=this.WC_MONTH[i-1];
this.TARGET_ASSETS=r
};
KJE.CapitalCalc.prototype.formatReport=function(b){b.dollars("TOTAL_CURRENT_ASSETS",this.TOTAL_CURRENT_ASSETS);
b.dollars("TOTAL_CURRENT_LIABILITIES",this.TOTAL_CURRENT_LIABILITIES);
b.percent("ANNUAL_DESIRED_GROWTH",this.ANNUAL_DESIRED_GROWTH/100);
b.number("ACTUAL_CURRENT_RATIO",this.ACTUAL_CURRENT_RATIO,2);
b.dollars("TARGET_WORKING_CAPITAL_END",this.TARGET_WORKING_CAPITAL_END);
b.dollars("ACTUAL_WORKING_CAPITAL",this.ACTUAL_WORKING_CAPITAL);
b.number("TARGET_CURRENT_RATIO",this.TARGET_CURRENT_RATIO,2);
b.percent("MONTHLY_GROWTH_RATE",this.MONTHLY_GROWTH_RATE,2);
b.dollars("TARGET_WORKING_CAPITAL",this.TARGET_WORKING_CAPITAL);
b.number("MONTHS_OF_ANALYSIS",this.MONTHS_OF_ANALYSIS);
b.dollars("TARGET_ASSETS",this.TARGET_ASSETS);
b.replace("WORKING_CAPITAL_CHANGE",this.WORKING_CAPITAL_CHANGE);
b.dollars("WORKING_CAPITAL_DIFF",this.WORKING_CAPITAL_DIFF);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CapitalCalc.prototype.getWorking=function(g,f,e,h){return KJE.FV_AMT(f,g,e)-KJE.FV_AMT(f,g,h)
};
KJE.CalcName="Working Capital Needs Calculator";
KJE.CalcType="capital";
KJE.CalculatorTitleTemplate="KJE1";
KJE.initialize=function(){KJE.CalcControl=new KJE.CapitalCalc();
KJE.GuiControl=new KJE.Capital(KJE.CalcControl)
};
KJE.Capital=function(n){var t=KJE;
var u=KJE.gLegend;
var q=KJE.inputs.items;
this.MSG_LABEL3=KJE.parameters.get("MSG_LABEL3","month");
this.MSG_LABEL4=KJE.parameters.get("MSG_LABEL4","Working capital month");
KJE.DollarSlider("TOTAL_CURRENT_ASSETS","Total current assets",1,10000000);
KJE.DollarSlider("TOTAL_CURRENT_LIABILITIES","Total current liabilities",1,10000000);
KJE.PercentSlider("ANNUAL_DESIRED_GROWTH","Annual growth",0,100,0);
KJE.NumberSlider("TARGET_CURRENT_RATIO","Target current ratio",1,10,2);
KJE.Label("ACTUAL_CURRENT_RATIO","Actual current ratio");
KJE.Label("ACTUAL_WORKING_CAPITAL","Current working capital");
KJE.Label("TARGET_WORKING_CAPITAL","Target working capital");
var p=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE","Required working capital grows to KJE1 in 12 months."));
p._legend.setVisible(false);
p._legend._iOrientation=(u.TOP_RIGHT);
p._titleXAxis.setText(this.MSG_LABEL3);
var v=KJE.parameters.get("MSG_DROPPER_TITLE","Working capital inputs:");
var s=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Assets KJE1, Liabilities KJE2, Annual growth KJE3");
var r=function(){return v+KJE.subText(KJE.getKJEReplaced(s,q.TOTAL_CURRENT_ASSETS.getFormatted(),q.TOTAL_CURRENT_LIABILITIES.getFormatted(),q.ANNUAL_DESIRED_GROWTH.getFormatted()),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,v,r),KJE.colorList[0]);
var m=KJE.parameters.get("MSG_DROPPER2_TITLE","Calculated results:");
var l=KJE.parameters.get("MSG_DROPPER2_CLOSETITLE","Actual current ratio KJE1. Current working capital is KJE2 with a target of KJE3.");
var o=function(){return m+KJE.subText(KJE.getKJEReplaced(l,t.number(n.ACTUAL_CURRENT_RATIO,2),t.dollars(n.ACTUAL_WORKING_CAPITAL),t.dollars(n.TARGET_WORKING_CAPITAL)),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS2",false,m,o),KJE.colorList[0])
};
KJE.Capital.prototype.setValues=function(c){var d=KJE.inputs.items;
c.ANNUAL_DESIRED_GROWTH=d.ANNUAL_DESIRED_GROWTH.getValue();
c.TOTAL_CURRENT_ASSETS=d.TOTAL_CURRENT_ASSETS.getValue();
c.TOTAL_CURRENT_LIABILITIES=d.TOTAL_CURRENT_LIABILITIES.getValue();
c.TARGET_CURRENT_RATIO=d.TARGET_CURRENT_RATIO.getValue()
};
KJE.Capital.prototype.refresh=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
KJE.setTitleTemplate(h.WORKING_CAPITAL_CHANGE);
g.removeAll();
g.setGraphCategories(h.cats);
g.add(new KJE.gGraphDataSeries(h.WC_MONTH,this.MSG_LABEL4,g.getColor(1)));
g.setTitleTemplate(i.dollars(h.WC_MONTH[h.MONTHS_OF_ANALYSIS-1]));
g.paint();
f.ACTUAL_CURRENT_RATIO.setText(i.number(h.ACTUAL_CURRENT_RATIO,2));
f.ACTUAL_WORKING_CAPITAL.setText(i.dollars(h.ACTUAL_WORKING_CAPITAL));
f.TARGET_WORKING_CAPITAL.setText(i.dollars(h.TARGET_WORKING_CAPITAL))
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-ANNUAL_DESIRED_GROWTH'><input id='KJE-ANNUAL_DESIRED_GROWTH' /></div> <div id='KJE-C-TARGET_CURRENT_RATIO'><input id='KJE-TARGET_CURRENT_RATIO' /></div> <div id='KJE-C-TOTAL_CURRENT_ASSETS'><input id='KJE-TOTAL_CURRENT_ASSETS' /></div> <div id='KJE-C-TOTAL_CURRENT_LIABILITIES'><input id='KJE-TOTAL_CURRENT_LIABILITIES' /></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-ACTUAL_CURRENT_RATIO'><div id='KJE-ACTUAL_CURRENT_RATIO'></div></div> <div id='KJE-C-ACTUAL_WORKING_CAPITAL'><div id='KJE-ACTUAL_WORKING_CAPITAL'></div></div> <div id='KJE-C-TARGET_WORKING_CAPITAL'><div id='KJE-TARGET_WORKING_CAPITAL'></div></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-ANNUAL_DESIRED_GROWTH' ><dt>Annual growth</dt><dd>The percent of growth you expect over the next year.</dd></div> <div id='KJE-D-TOTAL_CURRENT_ASSETS' ><dt>Total current assets</dt><dd>This is any cash or asset that can be quickly turned into cash. This includes prepaid expenses, accounts receivable, most securities and your inventory.</dd></div> <div id='KJE-D-TOTAL_CURRENT_LIABILITIES' ><dt>Total current liabilities</dt><dd>This is a liability in the immediate future. This includes wages, taxes and accounts payable.</dd></div> <div id='KJE-D-TARGET_CURRENT_RATIO' ><dt>Current ratio</dt><dd>Current Assets divided by current liabilities. Your current ratio helps you determine if you have enough working capital to meet your short-term financial obligations. A general rule of thumb is to have a current ratio of 2.0. Although this will vary by business and industry, a number above two may indicate a poor use of capital. A current ratio under two may indicate an inability to pay current financial obligations with a measure of safety.</dd></div> <div id='KJE-D-ACTUAL_WORKING_CAPITAL' ><dt>Working capital</dt><dd>Working capital is used by lenders to help gauge the ability for a company to weather difficult financial periods. Working capital is calculated by subtracting current liabilities from current assets. Due to differences in businesses and the fact that working capital is not a ratio but an absolute amount, it is difficult to predict what the ideal amount of working capital would be for your business. To calculate working capital requirements this calculator uses the 'Current Ratio' to determine a target amount of working capital. See the 'Current Ratio' definition for more information.</dd></div> ";
KJE.ReportText=' <!--HEADING "Working Capital Needs" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>WORKING_CAPITAL_CHANGE</h2>To maintain a current ratio of TARGET_CURRENT_RATIO you need a total of TARGET_WORKING_CAPITAL in working capital. Your actual working capital is ACTUAL_WORKING_CAPITAL with a current ratio of ACTUAL_CURRENT_RATIO. If you grow ANNUAL_DESIRED_GROWTH per year in MONTHS_OF_ANALYSIS months you will need TARGET_WORKING_CAPITAL_END of working capital. This will keep your current ratio at TARGET_CURRENT_RATIO. This assumes that both your current liabilities and current assets increase at an annual rate of ANNUAL_DESIRED_GROWTH. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><td class="KJEHeading KJECell40">&nbsp;</td><th class="KJEHeading KJECell20" scope=\'col\'>Actuals</th><th class="KJEHeading KJECell20" scope=\'col\'>Target Month 1</th><th class="KJEHeading KJECell20" scope=\'col\'>Target Month MONTHS_OF_ANALYSIS</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current ratio </th><td class="KJECell KJECellBorder">ACTUAL_CURRENT_RATIO </td> <td class="KJECell KJECellBorder">TARGET_CURRENT_RATIO </td><td class="KJECell">TARGET_CURRENT_RATIO </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Working capital </th><td class="KJECell KJECellBorder">ACTUAL_WORKING_CAPITAL</td><td class="KJECell KJECellBorder">TARGET_WORKING_CAPITAL</td><td class="KJECell">TARGET_WORKING_CAPITAL_END</td></tr> </tbody> </table> </div> <BR> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Input Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Total current assets </th><td class="KJECell KJECell40">TOTAL_CURRENT_ASSETS </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total current liabilities </th><td class="KJECell">TOTAL_CURRENT_LIABILITIES </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual growth rate </th><td class="KJECell">ANNUAL_DESIRED_GROWTH </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current ratio target </th><td class="KJECell">TARGET_CURRENT_RATIO </td></tr> </tbody> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Working capital estimates for the next MONTHS_OF_ANALYSIS months</h2> **REPEATING GROUP** <BR> <P class=KJEFooter>*Required total assets to meet current ratio target of TARGET_CURRENT_RATIO </P> ';
KJE.parameters.set("ANNUAL_DESIRED_GROWTH",20);
KJE.parameters.set("TARGET_CURRENT_RATIO",2);
KJE.parameters.set("TOTAL_CURRENT_ASSETS",20000);
KJE.parameters.set("TOTAL_CURRENT_LIABILITIES",12000);
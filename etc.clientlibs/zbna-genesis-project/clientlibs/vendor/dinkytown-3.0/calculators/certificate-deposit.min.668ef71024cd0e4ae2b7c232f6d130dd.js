KJE.CertDepositCalc=function(){this.COMPOUND_INTEREST=KJE.CertDepositCalc.COMPOUND_ANNUALLY;
this.PERCENT_DECIMALS=KJE.parameters.get("PERCENT_DECIMALS",3);
this.TOTAL_PERCENT_DECIMALS=KJE.parameters.get("TOTAL_PERCENT_DECIMALS",3);
this.TIME_LABEL="";
this.APY=0;
this.TOTAL_YIELD=0;
this.TOTAL_YIELD2=0;
this.SHOW_BY_YEAR_OVER=12;
this.DS_BALANCE=null;
this.DS_INTEREST=null;
this.DR_INTEREST=null;
this.cats=null;
this.sSchedule=new KJE.Repeating()
};
KJE.CertDepositCalc.prototype.clear=function(){this.STARTING_AMOUNT=0;
this.MONTHS=0;
this.RATE_OF_RETURN=0
};
KJE.CertDepositCalc.prototype.calculate=function(n){var F=KJE;
var I=this.STARTING_AMOUNT;
var u=this.MONTHS;
var G=this.RATE_OF_RETURN;
var J=KJE.CertDepositCalc.COMPOUND_FREQ[this.COMPOUND_INTEREST];
var x=(G/100)/J;
this.APY=KJE.FV_AMT(x,J,1)-1;
var i=KJE.FV_AMT(x,(J/12)*u,I);
this.TIME_LABEL=KJE.getTermLabel(u,false);
var C=Math.ceil((J/12)*u);
var H=false;
if(u>this.SHOW_BY_YEAR_OVER||this.COMPOUND_INTEREST==KJE.CertDepositCalc.COMPOUND_DAILY){C=Math.ceil(u/12);
H=true
}this.DR_INTEREST=KJE.FloatArray(C);
this.DS_BALANCE=KJE.FloatArray(C);
this.DS_INTEREST=KJE.FloatArray(C);
this.cats=KJE.FloatArray(C);
var B=0;
var w=0;
var D=0;
var A=Math.floor((J/12)*u);
var v=I;
for(var z=0;
z<A;
z++){B=(x*v);
w+=B;
v+=B;
if(((z+1)%J)==0||!H){this.DS_BALANCE[D]=F.round(v,2);
this.DR_INTEREST[D]=this.DS_BALANCE[D]-(D==0?I:this.DS_BALANCE[D-1]);
w=0;
D++
}}if(D<(C)){this.DS_BALANCE[D]=i;
this.DR_INTEREST[D]=i-(D!=0?this.DS_BALANCE[D-1]:0)
}else{this.DR_INTEREST[C-1]=i-(C>1?this.DS_BALANCE[C-2]:0);
this.DS_BALANCE[C-1]=i
}if(n){var E=this.sSchedule;
E.clearRepeat();
E.addHeader(E.sReportCol(H?KJE.CertDepositCalc.COMPOUND_SELECTIONS[KJE.CertDepositCalc.COMPOUND_ANNUALLY]:KJE.CertDepositCalc.COMPOUND_SELECTIONS[this.COMPOUND_INTEREST],1),E.sReportCol("Interest",3),E.sReportCol("Balance",4));
E.addRepeat("&nbsp;","&nbsp;",F.dollars(I,2))
}var y=0;
for(var z=1;
z<=C;
z++){y=z-1;
this.cats[y]=""+z;
this.DS_BALANCE[y]=((this.DS_BALANCE[y]));
if(y>0){this.DS_INTEREST[y]=((this.DR_INTEREST[y]))+this.DS_INTEREST[y-1]
}else{this.DS_INTEREST[y]=((this.DR_INTEREST[y]))
}if(n){E.addRepeat(z,F.dollars(this.DR_INTEREST[y],2),F.dollars(this.DS_BALANCE[y],2))
}}this.TOTAL_YIELD=((i-I)/(u/12))/I;
this.TOTAL_YIELD2=(i-I)/I;
this.TOTAL_AT_END_OF_INVESTMENT=i
};
KJE.CertDepositCalc.prototype.formatReport=function(b){b.dollars("STARTING_AMOUNT",this.STARTING_AMOUNT);
b.number("MONTHS",this.MONTHS);
b.returnRate("RATE_OF_RETURN",this.RATE_OF_RETURN/100);
b.percent("APY_RATE",this.APY,this.PERCENT_DECIMALS);
b.replace("COMPOUND_INTEREST",KJE.CertDepositCalc.COMPOUND_DESC[this.COMPOUND_INTEREST]);
b.dollars("TOTAL_AT_END_OF_INVESTMENT",this.TOTAL_AT_END_OF_INVESTMENT);
b.replace("TIME_LABEL",this.TIME_LABEL);
b.percent("TOTAL_YIELD2",this.TOTAL_YIELD2,this.TOTAL_PERCENT_DECIMALS);
b.percent("TOTAL_YIELD",this.TOTAL_YIELD,this.TOTAL_PERCENT_DECIMALS);
b.replace("COMPOUND_FREQ",KJE.CertDepositCalc.COMPOUND_FREQ[this.COMPOUND_INTEREST]);
b.replace("COMPOUND_SELECTION",KJE.CertDepositCalc.COMPOUND_SELECTIONS[this.COMPOUND_INTEREST]);
b.replace("COMPOUND_DESC",KJE.CertDepositCalc.COMPOUND_DESC[this.COMPOUND_INTEREST]);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CertDepositCalc.COMPOUND_DAILY=0;
KJE.CertDepositCalc.COMPOUND_MONTHLY=1;
KJE.CertDepositCalc.COMPOUND_QRTLY=2;
KJE.CertDepositCalc.COMPOUND_SEMI=3;
KJE.CertDepositCalc.COMPOUND_ANNUALLY=4;
KJE.CertDepositCalc.COMPOUND_INDEX=[0,1,2,3,4];
KJE.CertDepositCalc.COMPOUND_DESC=KJE.parameters.get("ARRAY_COMPOUND_DESC",["compounded daily","compounded monthly","compounded quarterly","compounded semi-annually","compounded annually"]);
KJE.CertDepositCalc.COMPOUND_SELECTIONS=KJE.parameters.get("ARRAY_COMPOUND_SELECTIONS",["Day","Month","Quarter","Semi-Annually","Year"]);
KJE.CertDepositCalc.COMPOUND_FREQ=[360,12,4,2,1];
KJE.CalcName="Certificate of Deposit Calculator";
KJE.CalcType="CertDeposit";
KJE.CalculatorTitle="Certificate of Deposit Calculator";
KJE.parseInputs=function(b){return KJE.replace("**COMPOUND_INTEREST**",KJE.getDropBox("COMPOUND_INTEREST",KJE.parameters.get("COMPOUND_INTEREST",KJE.CertDepositCalc.COMPOUND_ANNUALLY),KJE.CertDepositCalc.COMPOUND_INDEX,KJE.CertDepositCalc.COMPOUND_DESC),b)
};
KJE.initialize=function(){KJE.CalcControl=new KJE.CertDepositCalc();
KJE.GuiControl=new KJE.CertDeposit(KJE.CalcControl)
};
KJE.CertDeposit=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
this.GRAPH_LABEL_2=KJE.parameters.get("MSG_GRAPH_LABEL_2","Balance");
this.MSG_GRAPH_TITLE=KJE.parameters.get("MSG_GRAPH_TITLE1","Your total is KJE1 after KJE2");
KJE.DollarSlider("STARTING_AMOUNT","Initial deposit",KJE.parameters.get("MIN_STARTING_AMOUNT",1),KJE.parameters.get("MAX_STARTING_AMOUNT",10000000),0,0,4);
KJE.NumberSlider("MONTHS","Months",1,120,0);
KJE.InvestRateSlider("RATE_OF_RETURN","Interest rate");
KJE.DropBox("COMPOUND_INTEREST","Compounding");
KJE.Label("APY","Annual percentage yield (APY)");
KJE.Label("TOTAL_YIELD","Total annual yield");
KJE.Label("TOTAL_YIELD2","Total yield");
var g=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],this.MSG_GRAPH_TITLE);
g._legend.setVisible(false);
g._legend._iOrientation=(j.TOP_RIGHT);
KJE.addDiv("INPUTS",KJE.colorList[0])
};
KJE.CertDeposit.prototype.setValues=function(c){var d=KJE.inputs.items;
c.COMPOUND_INTEREST=d.COMPOUND_INTEREST.getValue();
c.RATE_OF_RETURN=d.RATE_OF_RETURN.getValue();
c.STARTING_AMOUNT=d.STARTING_AMOUNT.getValue();
c.MONTHS=d.MONTHS.getValue()
};
KJE.CertDeposit.prototype.refresh=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
g.removeAll();
if(h.DS_BALANCE.length>6){g._showItemLabel=false
}else{g._showItemLabel=true
}g.setGraphCategories(h.cats);
g.add(new KJE.gGraphDataSeries(h.DS_BALANCE,this.GRAPH_LABEL_2+(h.DS_BALANCE.length==1?"":" "+KJE.CertDepositCalc.COMPOUND_SELECTIONS[h.MONTHS>12?KJE.CertDepositCalc.COMPOUND_ANNUALLY:h.COMPOUND_INTEREST]),g.getColor(1)));
g.setTitleTemplate(i.dollars(h.TOTAL_AT_END_OF_INVESTMENT,2),h.TIME_LABEL);
if(h.DS_BALANCE.length==1){g._titleXAxis.setText("");
g._axisX.setVisible(false)
}else{g._titleXAxis.setText(KJE.CertDepositCalc.COMPOUND_SELECTIONS[h.MONTHS>12?KJE.CertDepositCalc.COMPOUND_ANNUALLY:h.COMPOUND_INTEREST]);
g._axisX.setVisible(true)
}g.paint();
f.APY.setText(i.percent(h.APY,h.PERCENT_DECIMALS));
f.TOTAL_YIELD.setText(i.percent(h.TOTAL_YIELD,h.TOTAL_PERCENT_DECIMALS));
f.TOTAL_YIELD2.setText(i.percent(h.TOTAL_YIELD2,h.TOTAL_PERCENT_DECIMALS))
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS > <div id='KJE-C-STARTING_AMOUNT'><input id='KJE-STARTING_AMOUNT' /></div> <div id='KJE-C-MONTHS'><input id='KJE-MONTHS' /></div> <div id='KJE-C-RATE_OF_RETURN'><input id='KJE-RATE_OF_RETURN' /></div> <div id='KJE-C-COMPOUND_INTEREST'>**COMPOUND_INTEREST**</div> <div id='KJE-C-APY'><div id='KJE-APY'></div></div> <div id='KJE-C-TOTAL_YIELD'><div id='KJE-TOTAL_YIELD'></div></div> <div id='KJE-C-TOTAL_YIELD2'><div id='KJE-TOTAL_YIELD2'></div></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-STARTING_AMOUNT' ><dt>Initial deposit</dt><dd>The amount of money you choose to open your CD with.</dd></div> <div id='KJE-D-MONTHS' ><dt>Months</dt><dd>The term of the CD, expressed in months.</dd></div> <div id='KJE-D-RATE_OF_RETURN' ><dt>Interest rate</dt><dd>The published interest rate for this CD. Make sure to enter the actual interest rate, not the annual percentage yield (APY). **ROR_SHORT_DEFINITION**</dd></div> <div id='KJE-D-COMPOUND_INTEREST' ><dt>Compounding</dt><dd> The interest earned on your CD is added to your CD balance at regular intervals. This is called \"compounding.\" This calculator allows you to choose the frequency that your CD's interest income is compounded. The more frequently this occurs, the sooner your accumulated interest income will generate additional interest. You may wish to check with your financial institution or account opening documents to find out how often interest is being compounded on your CD. </dd></div> <div id='KJE-D-APY' ><dt>Annual percentage yield (APY)</dt><dd>This is the effective annual interest rate earned for this CD. A CD's APY depends on the frequency of compounding and the interest rate. Since APY measures your actual interest earned per year, you can use it to compare CDs that have different interest rates and compounding frequencies.</dd></div> ";
KJE.ReportText=' <!--HEADING "Certificate of Deposit Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>After TIME_LABEL earning RATE_OF_RETURN COMPOUND_DESC, your CD is worth TOTAL_AT_END_OF_INVESTMENT. </h2> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Initial deposit </th><td class="KJECell KJECell40"> STARTING_AMOUNT </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Length of CD </th><td class="KJECell">TIME_LABEL (MONTHS months)</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate </th><td class="KJECell"> RATE_OF_RETURN COMPOUND_INTEREST</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual percentage yield (APY) </th><td class="KJECell"> APY_RATE </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total yield </th><td class="KJECell"> TOTAL_YIELD2 </td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Ending balance </th><td class="KJECellStrong">TOTAL_AT_END_OF_INVESTMENT</td></tr> </tfoot> </table> </div> **GRAPH** <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Certificate of Deposit Balances</h2> **REPEATING GROUP** ';
KJE.parameters.set("COMPOUND_INTEREST",KJE.CertDepositCalc.COMPOUND_ANNUALLY);
KJE.parameters.set("STARTING_AMOUNT",1000);
KJE.parameters.set("MONTHS",60);
KJE.parameters.set("RATE_OF_RETURN",KJE.Default.RORSave);
KJE.parameters.set("MIN_STARTING_AMOUNT",0);
KJE.parameters.set("TOTAL_YIELD_HIDE",true);
KJE.parameters.set("TOTAL_YIELD2_HIDE",true);
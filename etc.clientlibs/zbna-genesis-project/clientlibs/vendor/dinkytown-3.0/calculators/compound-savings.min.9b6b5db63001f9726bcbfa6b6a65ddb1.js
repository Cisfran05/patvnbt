KJE.CompoundSavingsCalc=function(){this.COMPOUND_PER_PERIOD=KJE.parameters.get("COMPOUND_PER_PERIOD",false);
this.bSHOW_BY_PERIOD=false;
this.bYEARS_TO_PROJECT=KJE.parameters.get("bYEARS_TO_PROJECT",false);
this.SHOW_BY_PERIOD_COUNT=3;
this.PERIODS=0;
this.COMPOUND_DESC="";
this.FREQ_DESC="";
this.PAYMENTS_AT_START=KJE.parameters.get("PAYMENTS_AT_START",true);
this.MSG_PERIOD_YEARS="";
this.sPeriodSelected2="";
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Savings period must be greater than zero");
this.ARK_252=false;
this.sFmtYears="";
this.DS_INTEREST=null;
this.DR_INTEREST=null;
this.DR_BALANCE=null;
this.cats=null;
this.sSchedule=new KJE.Repeating()
};
KJE.CompoundSavingsCalc.prototype.clear=function(){this.STARTING_AMOUNT=0;
this.ADDITIONAL_CONTRIBUTIONS=0;
this.YEARS=0;
this.YEARS_TO_PROJECT=0;
this.RATE_OF_RETURN=0;
this.COMPOUND_INTEREST_INDEX=KJE.CompoundSavingsCalc.COMPOUND_ANNUAL;
this.DEPOSIT_FREQUENCY_INDEX=KJE.CompoundSavingsCalc.DEPOSIT_ANNUAL
};
KJE.CompoundSavingsCalc.prototype.calculate=function(i){var O=KJE;
var T=this.STARTING_AMOUNT;
var F=this.ADDITIONAL_CONTRIBUTIONS;
var R=this.DEPOSIT_FREQUENCY=KJE.CompoundSavingsCalc.DEPOSIT_VALUE[this.DEPOSIT_FREQUENCY_INDEX];
this.FREQ_DESC=KJE.CompoundSavingsCalc.DEPOSIT_SELECTIONS[this.DEPOSIT_FREQUENCY_INDEX];
var P=this.YEARS;
var J=this.YEARS_TO_PROJECT;
var Q=this.RATE_OF_RETURN;
var U=this.COMPOUND_INTEREST=KJE.CompoundSavingsCalc.COMPOUND_VALUE[this.COMPOUND_INTEREST_INDEX];
this.COMPOUND_DESC=KJE.CompoundSavingsCalc.COMPOUND_SELECTIONS[this.COMPOUND_INTEREST_INDEX];
if(this.PERIODS==0&&P==0){throw (this.MSG_ERROR2)
}this.sPeriodSelected2=KJE.CompoundSavingsCalc.DEPOSIT_SELECTIONS[this.DEPOSIT_FREQUENCY_INDEX];
if(R!=1){this.sPeriodSelected=" / "+this.sPeriodSelected2
}else{this.sPeriodSelected=""
}P=P+Math.floor(this.PERIODS/R);
this.PERIODS=(this.PERIODS%R);
if(J<P||!this.bYEARS_TO_PROJECT){J=P
}if(this.PERIODS>0){this.MSG_PERIOD_YEARS=O.number(((P*R)+this.PERIODS)/R,1)
}else{this.MSG_PERIOD_YEARS=O.number(P)
}if(this.PERIODS+P*R<=this.SHOW_BY_PERIOD_COUNT*R&&R!=1){this.bSHOW_BY_PERIOD=true
}this.sFmtYears="";
if(P>0){this.sFmtYears=O.number(J)+" "+(J==1?KJE.MSG_YEAR_LBL:KJE.MSG_YEARS_LBL)
}if(this.PERIODS>0){this.sFmtYears+=(this.sFmtYears.length>0?" "+KJE.MSG_AND_LBL+" ":"")+O.number(this.PERIODS)+" "+this.sPeriodSelected2
}if(this.ARK_252){U=1;
R=252;
this.COMPOUND_DESC=""
}var I=T+(F*((R*P)+this.PERIODS));
var K=Math.round(J);
if(this.PERIODS!=0){K++
}this.DR_INTEREST=KJE.FloatArray(K);
this.DR_BALANCE=KJE.FloatArray(K);
this.DR_ADDITIONS=KJE.FloatArray(K);
var C=0;
var G=0;
var S=0;
var B=0;
var A=0;
var L=0;
if(U==R){if(this.COMPOUND_PER_PERIOD){C=Q/100
}else{C=(Q/R)/100
}}else{if(U==1){S=Q/100
}else{if(this.COMPOUND_PER_PERIOD){S=KJE.FV_AMT(Q/100,U,1)
}else{S=1/Math.pow((1+Q/(U*100)),(-1*U))-1
}}C=Math.pow(1+(S),1/R)-1
}if(i){var N=this.sSchedule;
N.clearRepeat();
N.addHeader((this.bSHOW_BY_PERIOD?(N.sReportCol("x",1)==("x")?""+(this.sPeriodSelected2==("")?"":this.sPeriodSelected2.substring(0,1).toUpperCase()+this.sPeriodSelected2.substring(1,this.sPeriodSelected2.length))+"":"&nbsp;"):N.sReportCol("Year",1)),N.sReportCol("Additions",2),N.sReportCol("Interest",3),N.sReportCol("Balance",4));
N.addRepeat((N.sReportCol("x",1)==("x")?"Start":"&nbsp;"),O.dollars(T,2),"&nbsp;",O.dollars(T,2))
}var V=R*J+this.PERIODS;
var M=R*P+this.PERIODS;
var n=T;
for(var E=0;
E<V;
E++){var H=(E<M?F:0);
A+=H;
if(this.PAYMENTS_AT_START){n+=H;
G=O.round(C*n,2);
B+=G;
n+=G
}else{G=O.round(C*n,2);
B+=G;
n+=H;
n+=G
}if(i&&this.bSHOW_BY_PERIOD){N.addRepeat(O.input(E+1),O.dollars(H,2),O.dollars(G,2),O.dollars(n,2))
}if(((E+1)%R)==0){this.DR_BALANCE[L]=n;
this.DR_INTEREST[L]=B;
this.DR_ADDITIONS[L]=A;
B=0;
A=0;
L++
}}if((this.DR_INTEREST.length>L)){this.DR_BALANCE[L]=n;
this.DR_INTEREST[L]=B;
this.DR_ADDITIONS[L]=A
}var D=0;
this.DS_INTEREST=KJE.FloatArray(K);
this.cats=new Array(K);
for(E=1;
E<=K;
E++){D=E-1;
this.cats[D]=""+E;
if(D>0){this.DS_INTEREST[D]=this.DR_INTEREST[D]+this.DS_INTEREST[D-1]
}else{this.DS_INTEREST[D]=this.DR_INTEREST[D]
}if(i&&!this.bSHOW_BY_PERIOD){N.addRepeat(O.input(E),O.dollars(this.DR_ADDITIONS[D],2),O.dollars(this.DR_INTEREST[D],2),O.dollars(this.DR_BALANCE[D],2))
}}this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN=O.round(I,2);
this.TOTAL_AT_END_OF_INVESTMENT=O.round(n,2);
this.YEARS=P;
this.YEARS_TO_PROJECT=J
};
KJE.CompoundSavingsCalc.prototype.formatReport=function(b){b.replace("DEPOSIT_TYPE",(this.PAYMENTS_AT_START?"at the start of each period":"at the end of each period"));
b.dollars("STARTING_AMOUNT",this.STARTING_AMOUNT);
b.dollars("ADDITIONAL_CONTRIBUTIONS",this.ADDITIONAL_CONTRIBUTIONS);
b.replace("DEPOSIT_FREQUENCY",this.FREQ_DESC);
b.replace("FMT_PERIODS",this.sFmtYears);
b.replace("YEARS_TO_PROJECT",this.YEARS_TO_PROJECT);
b.replace("YEARS",this.MSG_PERIOD_YEARS);
b.returnRate("RATE_OF_RETURN",this.RATE_OF_RETURN/100);
b.replace("COMPOUND_INTEREST",KJE.replace("compound","compounded",this.COMPOUND_DESC));
b.dollars("TOTAL_AMOUNT_YOU_HAVE_PAID_IN",this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN);
b.dollars("TOTAL_AT_END_OF_INVESTMENT",this.TOTAL_AT_END_OF_INVESTMENT);
b.dollars("TOTAL_INTEREST_AT_END_OF_INVESTMENT",this.TOTAL_AT_END_OF_INVESTMENT-this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CompoundSavingsCalc.DEPOSIT_ANNUAL=4;
KJE.CompoundSavingsCalc.DEPOSIT_MONTHLY=2;
KJE.CompoundSavingsCalc.COMPOUND_ANNUAL=3;
KJE.CompoundSavingsCalc.COMPOUND_MONTHLY=1;
KJE.CompoundSavingsCalc.DEPOSIT_SELECTIONS=KJE.parameters.get("ARRAY_DEPOSIT_SELECTIONS",["per week","bi-weekly","per month","per quarter","per year"]);
KJE.CompoundSavingsCalc.DEPOSIT_PERIODS=KJE.parameters.get("ARRAY_DEPOSIT_PERIODS",["Weeks","Bi-weeks","Months","Quarters",""]);
KJE.CompoundSavingsCalc.DEPOSIT_VALUE=KJE.parameters.get("ARRAY_DEPOSIT_VALUE",[52,26,12,4,1]);
KJE.CompoundSavingsCalc.DEPOSIT_INDEX=KJE.parameters.get("ARRAY_DEPOSIT_INDEX",[0,1,2,3,4]);
KJE.CompoundSavingsCalc.COMPOUND_SELECTIONS=KJE.parameters.get("ARRAY_COMPOUND_SELECTIONS",["compound daily","compound monthly","compound quarterly","compound annually"]);
KJE.CompoundSavingsCalc.COMPOUND_VALUE=KJE.parameters.get("ARRAY_COMPOUND_VALUE",[365,12,4,1]);
KJE.CompoundSavingsCalc.COMPOUND_INDEX=KJE.parameters.get("ARRAY_COMPOUND_INDEX",[0,1,2,3]);
KJE.CalcName="Compound Savings Calculator";
KJE.CalcType="compoundsavings";
KJE.CalculatorTitleTemplate="Your estimated total is KJE1 after KJE2.";
KJE.parseInputs=function(e){var f=KJE.getDropBox("COMPOUND_INTEREST",KJE.CompoundSavingsCalc.COMPOUND_ANNUAL,KJE.CompoundSavingsCalc.COMPOUND_INDEX,KJE.CompoundSavingsCalc.COMPOUND_SELECTIONS);
e=KJE.replace("**COMPOUND_INTEREST**",f,e);
var d=KJE.getDropBox("DEPOSIT_FREQUENCY",KJE.parameters.get("DEPOSIT_FREQUENCY",KJE.CompoundSavingsCalc.DEPOSIT_MONTHLY),KJE.CompoundSavingsCalc.DEPOSIT_INDEX,KJE.CompoundSavingsCalc.DEPOSIT_SELECTIONS);
e=KJE.replace("**DEPOSIT_FREQUENCY**",d,e);
return e
};
KJE.initialize=function(){KJE.CalcControl=new KJE.CompoundSavingsCalc();
KJE.GuiControl=new KJE.CompoundSavings(KJE.CalcControl)
};
KJE.CompoundSavings=function(l){var p=KJE;
var s=KJE.gLegend;
var o=KJE.inputs.items;
KJE.SliderKnobExtraClass=(KJE.DropperColors?KJE.DropperColors[0]:false);
KJE.DollarSlider("STARTING_AMOUNT","Starting amount",0,2000000000,0,0,2);
KJE.DollarSlider("ADDITIONAL_CONTRIBUTIONS","Additional contributions",0,10000000,0,0,1);
KJE.NumberSlider("YEARS","Years to save",KJE.parameters.get("YEARS_MINIMUM",0),100,0);
KJE.NumberSlider("YEARS_TO_PROJECT","Years to compound interest",KJE.parameters.get("YEARS_MINIMUM",0),100,0);
var k=100;
if(KJE.parameters.get("DEPOSIT_FREQUENCY_HIDE",false)==true&&KJE.parameters.get("DEPOSIT_FREQUENCY",KJE.CompoundSavingsCalc.DEPOSIT_MONTHLY)==KJE.CompoundSavingsCalc.DEPOSIT_MONTHLY){k=12
}KJE.NumberSlider("PERIODS","Periods",0,k,0);
KJE.InvestRateSlider("RATE_OF_RETURN","Rate of return");
KJE.DropBox("COMPOUND_INTEREST","Interest");
KJE.DropBox("DEPOSIT_FREQUENCY","Frequency");
KJE.Checkbox("PAYMENTS_AT_START","Payments at start of period",true,"");
this.GRAPH_LABEL_2=KJE.parameters.get("MSG_GRAPH_LABEL_2","balance year");
var n=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_LABEL_1","Balance by Year"));
n._legend.setVisible(false);
n._legend._iOrientation=(s.TOP_RIGHT);
var t=KJE.parameters.get("MSG_DROPPER_TITLE","Savings inputs: ");
var r=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 with an additional KJE2 KJE3 at KJE4");
var m=KJE.parameters.get("SHOW_DROPPER_TOTAL",false);
if(m){var q=function(){return t+"|"+KJE.subText(p.dollars(l.TOTAL_AT_END_OF_INVESTMENT),"KJERightBold",KJE.subTextDropperContainer)
}
}else{var q=function(){return t+KJE.subText(KJE.getKJEReplaced(r,p.dollars(l.STARTING_AMOUNT),p.dollars(l.ADDITIONAL_CONTRIBUTIONS),l.FREQ_DESC,p.percent(l.RATE_OF_RETURN/100,3)),"KJECenter")
}
}KJE.addDropper(new KJE.Dropper("INPUTS",true,(m?q:t),q),KJE.colorList[0])
};
KJE.CompoundSavings.prototype.setValues=function(c){var d=KJE.inputs.items;
c.PAYMENTS_AT_START=d.PAYMENTS_AT_START.getValue();
c.DEPOSIT_FREQUENCY_INDEX=d.DEPOSIT_FREQUENCY.getValue();
if(c.DEPOSIT_FREQUENCY!=KJE.CompoundSavingsCalc.DEPOSIT_ANNUAL){d.PERIODS.enable()
}else{d.PERIODS.disable();
d.PERIODS.setValue(0,true);
c.PERIODS=0
}c.COMPOUND_INTEREST_INDEX=d.COMPOUND_INTEREST.getValue();
c.ADDITIONAL_CONTRIBUTIONS=d.ADDITIONAL_CONTRIBUTIONS.getValue();
c.RATE_OF_RETURN=d.RATE_OF_RETURN.getValue();
c.STARTING_AMOUNT=d.STARTING_AMOUNT.getValue();
c.YEARS=d.YEARS.getValue();
c.YEARS_TO_PROJECT=d.YEARS_TO_PROJECT.getValue();
c.PERIODS=d.PERIODS.getValue()
};
KJE.CompoundSavings.prototype.refresh=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
KJE.setTitleTemplate(i.dollars(h.TOTAL_AT_END_OF_INVESTMENT),h.sFmtYears.trim());
h.bSHOW_BY_PERIOD=false;
g.removeAll();
g.setGraphCategories(h.cats);
g._showItemLabel=!(h.DR_BALANCE.length>6);
g._showItemLabelOnTop=true;
g.add(new KJE.gGraphDataSeries(h.DR_BALANCE,this.GRAPH_LABEL_2,g.getColor(1)));
g.paint();
f.YEARS.setValue(h.YEARS,true);
f.YEARS_TO_PROJECT.setValue(h.YEARS_TO_PROJECT,true);
f.PERIODS.setValue(h.PERIODS,true);
KJE.setLabelText(f.PERIODS._label,KJE.CompoundSavingsCalc.DEPOSIT_PERIODS[h.DEPOSIT_FREQUENCY_INDEX]+KJE.Colon)
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-STARTING_AMOUNT'><input id='KJE-STARTING_AMOUNT' /></div> <div id='KJE-C-YEARS'><input id='KJE-YEARS' /></div> <div id='KJE-C-PERIODS'><input id='KJE-PERIODS' /></div> <div id='KJE-C-RATE_OF_RETURN'><input id='KJE-RATE_OF_RETURN' /></div> <div id='KJE-C-ADDITIONAL_CONTRIBUTIONS'><input id='KJE-ADDITIONAL_CONTRIBUTIONS' /></div> <div id='KJE-C-DEPOSIT_FREQUENCY'>**DEPOSIT_FREQUENCY**</div> <div id='KJE-C-COMPOUND_INTEREST'>**COMPOUND_INTEREST**</div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-STARTING_AMOUNT' ><dt>Starting amount</dt><dd>The starting balance or current amount you have invested or saved.</dd></div> <div id='KJE-D-YEARS' ><dt>Years to save</dt><dd>The total number years you are planning to save or invest.</dd></div> <div id='KJE-D-RATE_OF_RETURN' ><dt>Rate of return</dt><dd>The annual rate of return for this investment or savings account. **ROR_DEFINITION**</dd></div> <div id='KJE-D-COMPOUND_INTEREST' ><dt>Interest compounding</dt><dd>Earnings on an investment's earnings, plus previous interest. This calculator allows you to choose the frequency that your investment's interest or income is added to your account. The more frequently this occurs, the sooner your accumulated earnings will generate additional earnings. For stock and mutual fund investments, you should usually choose 'Annual'. For savings accounts and CDs, all of the options are valid, although you will need to check with your financial institution to find out how often interest is being compounded on your particular investment.</dd></div> <div id='KJE-D-ADDITIONAL_CONTRIBUTIONS' ><dt>Additional contributions</dt><dd>The amount that you plan on adding to your savings or investment each period. This calculator assumes that you make your contributions at the beginning of each period.</dd></div> <div id='KJE-D-DEPOSIT_FREQUENCY' ><dt>Frequency of contributions</dt><dd>How often you make contributions to your account. The options include weekly, bi-weekly, monthly, quarterly and annually. This calculator assumes that you make your contributions at the beginning of each period.</dd></div> ";
KJE.ReportText=' <h2 class=\'KJEReportHeader KJEFontHeading\'>Your savings could be worth TOTAL_AT_END_OF_INVESTMENT after FMT_PERIODS. </h2>If you save ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY your savings may grow to TOTAL_AT_END_OF_INVESTMENT after FMT_PERIODS. This includes a starting balance of STARTING_AMOUNT and a RATE_OF_RETURN annual rate of return. <p>**GRAPH** <p><div class=KJECenter><div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Starting amount</th><td class="KJECell KJECell30">STARTING_AMOUNT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Years</th><td class="KJECell">FMT_PERIODS.</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Additional contributions</th><td class="KJECell">ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Rate of return</th><td class="KJECell">RATE_OF_RETURN COMPOUND_INTEREST</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total amount you will have contributed</th><td class="KJECell">TOTAL_AMOUNT_YOU_HAVE_PAID_IN</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest</th><td class="KJECell">TOTAL_INTEREST_AT_END_OF_INVESTMENT</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total at end of investment</th><td class="KJECell">TOTAL_AT_END_OF_INVESTMENT</td></tr> </tfoot> </table> </div></div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Savings Balance</h2> **REPEATING GROUP** ';
KJE.parameters.set("YEARS",10);
KJE.parameters.set("ADDITIONAL_CONTRIBUTIONS",50);
KJE.parameters.set("COMPOUND_INTEREST",KJE.CompoundSavingsCalc.COMPOUND_ANNUAL);
KJE.parameters.set("DEPOSIT_FREQUENCY",KJE.CompoundSavingsCalc.DEPOSIT_MONTHLY);
KJE.parameters.set("ERROR_MSG2","Time to save must be at least one period");
KJE.parameters.set("RATE_OF_RETURN",KJE.Default.RORSave);
KJE.parameters.set("SIMPLE",false);
KJE.parameters.set("STARTING_AMOUNT",1000);
KJE.parameters.set("PERIODS_HIDE",true);
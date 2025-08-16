KJE.MillionaireCalc=function(){this.AGE_CURRENT=0;
this.AMT_CURRENT=0;
this.AMT_SAVE_MONTH=0;
this.INFLATION_RATE=0;
this.AMT_TARGET=1000000;
this.NBR_PERIODS=12;
this.PAYMENTS_AT_START=KJE.parameters.get("PAYMENTS_AT_START",true);
this.MAX_AGE=100;
this.MAX_CURRENT_AMT=1000000;
this.MAX_SAVE_MONTH=100000;
this.MAX_ROR_INVEST=100/this.NBR_PERIODS;
this.MAX_MONTHS_BF_TARGET=this.MAX_AGE*this.NBR_PERIODS;
this.YRS_BF_TARGET=0;
this.MONTHS_BF_TARGET=0;
this.ROR_MONTHLY_PERC=0;
this.MSG_EXCEED=KJE.parameters.get("MSG_EXCEED","You're going to be a millionaire!");
this.MSG_MADE=KJE.parameters.get("MSG_MADE","Perfect");
this.MSG_FAIL=KJE.parameters.get("MSG_FAIL","You need a few savings changes.");
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Your current age must be less than your target age.")
};
KJE.MillionaireCalc.prototype.clear=function(){this.AGE_DESIRED=0;
this.ROR_INVEST=0
};
KJE.MillionaireCalc.prototype.calculate=function(p){var s=KJE;
var q=this.AGE_DESIRED;
var v=this.ROR_INVEST;
var u="";
var r=false;
if(this.AGE_CURRENT>=q){throw (this.MSG_ERROR1)
}this.YRS_BF_TARGET=q-this.AGE_CURRENT;
this.MONTHS_BF_TARGET=this.YRS_BF_TARGET*this.NBR_PERIODS;
this.ROR_MONTHLY_PERC=KJE.ROR_MONTH(v/100);
this.AMT_AT_TARGET=this.solveAmtAtYear(this.YRS_BF_TARGET);
var z=this.solveForMonths(this.AMT_TARGET,this.AMT_CURRENT,this.ROR_MONTHLY_PERC,this.MONTHS_BF_TARGET,this.AMT_SAVE_MONTH);
var w=this.solveForCurrentAmt(this.AMT_TARGET,this.AMT_CURRENT,this.ROR_MONTHLY_PERC,this.MONTHS_BF_TARGET,this.AMT_SAVE_MONTH);
var n=this.solveForSaveAmt(this.AMT_TARGET,this.AMT_CURRENT,this.ROR_MONTHLY_PERC,this.MONTHS_BF_TARGET,this.AMT_SAVE_MONTH);
var t=KJE.FV_AMT(this.solveForROR(this.AMT_TARGET,this.AMT_CURRENT,this.ROR_MONTHLY_PERC,this.MONTHS_BF_TARGET,this.AMT_SAVE_MONTH),this.NBR_PERIODS,1)-1;
var o=(z/this.NBR_PERIODS);
var y=Math.round(o+this.AGE_CURRENT);
var x=KJE.NPV_AMT(this.INFLATION_RATE/100,o,this.AMT_TARGET);
if(y<q){u=this.MSG_EXCEED;
r=true
}else{if(y==q){u=this.MSG_MADE;
r=true
}else{u=this.MSG_FAIL;
r=false
}}this.MONTHS_TO_MILLION=z;
this.RQD_CURRENT=w;
this.RQD_SAVE_MONTH=n;
this.RQR_ROR_BFTAX=t;
this.YEARS_TO_MILLION=o;
this.AGE_AT_MILLION=y;
this.NPV_MILLION=x;
this.YOU_MADE_IT=u;
this.MADE_IT=r
};
KJE.MillionaireCalc.prototype.formatReport=function(b){b.age("AGE_CURRENT",this.AGE_CURRENT);
b.age("AGE_DESIRED",this.AGE_DESIRED);
b.dollars("AMT_CURRENT",this.AMT_CURRENT);
b.dollars("AMT_SAVE_MONTH",this.AMT_SAVE_MONTH);
b.returnRate("ROR_INVEST",this.ROR_INVEST/100);
b.inflationRate("INFLATION_RATE",this.INFLATION_RATE/100);
b.number("YRS_BF_TARGET",this.YRS_BF_TARGET);
b.number("MONTHS_BF_TARGET",this.MONTHS_BF_TARGET);
b.returnRate("ROR_MONTHLY_PERC",this.ROR_MONTHLY_PERC);
b.number("MONTHS_TO_MILLION",this.MONTHS_TO_MILLION);
b.dollars("RQD_CURRENT",this.RQD_CURRENT);
b.dollars("RQD_SAVE_MONTH",this.RQD_SAVE_MONTH);
b.returnRate("RQR_ROR_BFTAX",this.RQR_ROR_BFTAX);
b.year("YEARS_TO_MILLION",this.YEARS_TO_MILLION);
b.age("AGE_AT_MILLION",this.AGE_AT_MILLION);
b.dollars("NPV_MILLION",this.NPV_MILLION);
b.replace("YOU_MADE_IT",this.YOU_MADE_IT);
b.dollars("AMT_TARGET",this.AMT_TARGET);
b.number("NBR_PERIODS",this.NBR_PERIODS)
};
KJE.MillionaireCalc.prototype.solveForMonths=function(i,h,j,m,l){m=this.MAX_MONTHS_BF_TARGET/2;
var k=this.MAX_MONTHS_BF_TARGET/4;
for(var n=0;
n<30;
n++){if(this.ifTargetGreater(i,h,j,m,l)){m+=k
}else{m-=k
}k=k/2
}return m
};
KJE.MillionaireCalc.prototype.getAmts=function(){var c=KJE.FloatArray(this.YRS_BF_TARGET+1);
for(var d=0;
d<=this.YRS_BF_TARGET;
d++){c[d]=(this.solveAmtAtYear(d))
}return c
};
KJE.MillionaireCalc.prototype.getAmtsAfterInflation=function(){var d=KJE.FloatArray(this.YRS_BF_TARGET+1);
var f=this.INFLATION_RATE/100;
for(var e=0;
e<=this.YRS_BF_TARGET;
e++){d[e]=KJE.NPV_AMT(f,e,this.solveAmtAtYear(e))
}return d
};
KJE.MillionaireCalc.prototype.getCategories=function(){var c=new Array(this.YRS_BF_TARGET+1);
for(var d=0;
d<=this.YRS_BF_TARGET;
d++){c[d]=(d+this.AGE_CURRENT)+""
}return c
};
KJE.MillionaireCalc.prototype.solveAmtAtYear=function(b){return KJE.FV_AMT(this.ROR_MONTHLY_PERC,b*this.NBR_PERIODS,this.AMT_CURRENT)+(this.PAYMENTS_AT_START?KJE.FV_BEGIN(this.ROR_MONTHLY_PERC,b*this.NBR_PERIODS,this.AMT_SAVE_MONTH):KJE.FV(this.ROR_MONTHLY_PERC,b*this.NBR_PERIODS,this.AMT_SAVE_MONTH))
};
KJE.MillionaireCalc.prototype.solveForCurrentAmt=function(i,h,j,m,l){h=this.MAX_CURRENT_AMT/2;
var k=this.MAX_CURRENT_AMT/4;
for(var n=0;
n<30;
n++){if(this.ifTargetGreater(i,h,j,m,l)){h+=k
}else{h-=k
}k=k/2
}return h
};
KJE.MillionaireCalc.prototype.solveForSaveAmt=function(i,h,j,m,l){l=this.MAX_SAVE_MONTH/2;
var k=this.MAX_SAVE_MONTH/4;
for(var n=0;
n<30;
n++){if(this.ifTargetGreater(i,h,j,m,l)){l+=k
}else{l-=k
}k=k/2
}return l
};
KJE.MillionaireCalc.prototype.solveForROR=function(i,h,j,m,l){j=this.MAX_ROR_INVEST/2;
var k=this.MAX_ROR_INVEST/4;
for(var n=0;
n<30;
n++){if(this.ifTargetGreater(i,h,j,m,l)){j+=k
}else{j-=k
}k=k/2
}return j
};
KJE.MillionaireCalc.prototype.ifTargetGreater=function(g,f,h,j,i){return(g>KJE.FV_AMT(h,j,f)+(this.PAYMENTS_AT_START?KJE.FV_BEGIN(h,j,i):KJE.FV(h,j,i)))
};
KJE.CalcName="Cool Million Calculator";
KJE.CalcType="coolmillion";
KJE.CalculatorTitleTemplate="Current plan could make you a millionaire at age KJE1!";
KJE.ReportGraphCount=1;
KJE.initialize=function(){KJE.CalcControl=new KJE.MillionaireCalc();
KJE.GuiControl=new KJE.Millionaire(KJE.CalcControl)
};
KJE.Millionaire=function(k){var l=KJE;
var n=KJE.gLegend;
var p=KJE.inputs.items;
this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Balance");
this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Balance after inflation");
var m=KJE.parameters.get("MSG_DROPPER_TITLE","Millionaire savings plan: ");
var o=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 plus KJE2 per month earning KJE3 per year.");
KJE.NumberSlider("AGE_CURRENT","Your age",0,100,0);
KJE.NumberSlider("AGE_DESIRED","Millionaire target age",1,100,0);
KJE.Slider("AMT_CURRENT","Amount currently invested",0,10000000,0,l.FMT_DOLLARS,1,KJE.s_label[4],KJE.useScale(4));
KJE.Slider("AMT_SAVE_MONTH","Savings per month",0,10000,0,l.FMT_DOLLARS,1,KJE.s_label[0],KJE.useScale(0));
KJE.InvestRateSlider("ROR_INVEST","Expected Rate of return");
KJE.InflationRateSlider("INFLATION_RATE","Expected inflation rate");
var j=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE","Total at age KJE1 is KJE2"));
j._legend._iOrientation=(n.GRID_TOP_LEFT);
j._titleXAxis.setText(p.AGE_CURRENT.getName());
j._titleYAxis.setText(KJE.sCurrency);
var i=function(){return m+KJE.subText(KJE.getKJEReplaced(o,p.AMT_CURRENT.getFormatted(),p.AMT_SAVE_MONTH.getFormatted(),p.ROR_INVEST.getFormatted()),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,m,i),KJE.colorList[0])
};
KJE.Millionaire.prototype.setValues=function(c){var d=KJE.inputs.items;
c.AGE_CURRENT=d.AGE_CURRENT.getValue();
c.AGE_DESIRED=d.AGE_DESIRED.getValue();
c.AMT_CURRENT=d.AMT_CURRENT.getValue();
c.AMT_SAVE_MONTH=d.AMT_SAVE_MONTH.getValue();
c.ROR_INVEST=d.ROR_INVEST.getValue();
c.INFLATION_RATE=d.INFLATION_RATE.getValue()
};
KJE.Millionaire.prototype.refresh=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
KJE.setTitleTemplate(Math.round(h.AGE_AT_MILLION));
g.removeAll();
g.setGraphCategories(h.getCategories());
g.add(new KJE.gGraphDataSeries(h.getAmts(),this.MSG_GRAPH1,g.getColor(1)));
g.add(new KJE.gGraphDataSeries(h.getAmtsAfterInflation(),this.MSG_GRAPH2,g.getColor(2)));
g.setTitleTemplate(h.AGE_DESIRED,i.dollars(h.AMT_AT_TARGET));
g.paint()
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-AGE_CURRENT'><input id='KJE-AGE_CURRENT' /></div> <div id='KJE-C-AGE_DESIRED'><input id='KJE-AGE_DESIRED' /></div> <div id='KJE-C-AMT_CURRENT'><input id='KJE-AMT_CURRENT' /></div> <div id='KJE-C-AMT_SAVE_MONTH'><input id='KJE-AMT_SAVE_MONTH' /></div> <div id='KJE-C-ROR_INVEST'><input id='KJE-ROR_INVEST' /></div> <div id='KJE-C-INFLATION_RATE'><input id='KJE-INFLATION_RATE' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-AGE_CURRENT' ><dt>Your age</dt><dd>Your current age in years.</dd></div> <div id='KJE-D-AGE_DESIRED' ><dt>Millionaire target age</dt><dd>The age you want to become a millionaire. For example, to find out what it could take to be a millionaire by age 40, enter 40 here.</dd></div> <div id='KJE-D-AMT_CURRENT' ><dt>Amount currently invested</dt><dd>Total value of all of your current investments. Although you could include your home and personal property in this amount - it is a bit more accurate to include only your savings, retirement accounts and investments.</dd></div> <div id='KJE-D-AMT_SAVE_MONTH' ><dt>Savings per month</dt><dd>The amount you will contribute each month to your investments. This calculator assumes that all savings are added to your account at the beginning of the month.</dd></div> <div id='KJE-D-ROR_INVEST' ><dt>Expected rate of return</dt><dd>This is the annually compounded rate of return you expect from your investments. For the purposes of this calculator, taxation is not factored into the results. If you pay taxes on the interest, dividends or capital gains from these investments, you may wish to enter your after-tax rate of return.<p>**ROR_DEFINITION**</dd></div> <div id='KJE-D-INFLATION_RATE' ><dt>Expected inflation rate</dt><dd>**INFLATION_DEFINITION**</dd></div> ";
KJE.ReportText=' <h2 class=\'KJEReportHeader KJEFontHeading\'>With your current investment plan you could be a millionaire at age AGE_AT_MILLION.</h2>**GRAPH** <p>To target a million dollars by age AGE_DESIRED? <ul> <li>Change your monthly savings to <strong>RQD_SAVE_MONTH</strong>.</li> <li>Change your current amount invested to <strong>RQD_CURRENT</strong>.</li> <li>Receive a rate of return of <strong>RQR_ROR_BFTAX</strong>.</li> </ul> <p>Adjusted for INFLATION_RATE annual inflation, at age AGE_AT_MILLION a million dollars would be worth NPV_MILLION. <p><div class=KJECenter><div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Your Input Values</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Current age:</th><td class="KJECell">AGE_CURRENT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Target millionaire age:</th><td class="KJECell">AGE_DESIRED</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Amount currently invested:</th><td class="KJECell">AMT_CURRENT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Amount you can save per month:</th><td class="KJECell">AMT_SAVE_MONTH</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Expected rate of return on investments:</th><td class="KJECell">ROR_INVEST</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Inflation rate:</th><td class="KJECell">INFLATION_RATE</td></tr> </tbody> </table> </div></div> ';
KJE.parameters.set("AGE_DESIRED",65);
KJE.parameters.set("AMT_CURRENT",10000);
KJE.parameters.set("AMT_SAVE_MONTH",500);
KJE.parameters.set("AGE_CURRENT",30);
KJE.parameters.set("INFLATION_RATE",KJE.Default.InflationRate);
KJE.parameters.set("ROR_INVEST",KJE.Default.RORMarket);
KJE.AutoEquityLoanCalc=function(){this.MSG_SHORT1=KJE.parameters.get("MSG_SHORT1","A home equity loan could save you DIFFERENCE");
this.MSG_SHORT2=KJE.parameters.get("MSG_SHORT2","An auto loan could save you DIFFERENCE");
this.MSG_LONG1=KJE.parameters.get("MSG_LONG1","A home equity loan could save you DIFFERENCE over the term of your loan.");
this.MSG_LONG2=KJE.parameters.get("MSG_LONG2","An auto loan could save you DIFFERENCE over the term of your loan.");
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Auto loan interest rate must be greater than or equal to zero.");
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Home equity interest rate greater than or equal to zero.");
this.MSG_ERROR3=KJE.parameters.get("MSG_ERROR3","Your monthly payment is less than zero.");
this.MSG_TAX_LESS_TRADE=KJE.parameters.get("MSG_TAX_LESS_TRADE","Sales tax was calculated as SALES_TAX_RATE times your vehicle price of AUTO_SALE_PRICE minus your trade-in allowance of TRADE_ALLOWANCE.");
this.MSG_TAX_NO_TRADE=KJE.parameters.get("MSG_TAX_NO_TRADE","Sales tax was calculated as SALES_TAX_RATE times your vehicle price of AUTO_SALE_PRICE. No deduction was included for you trade-in allowance of TRADE_ALLOWANCE.");
this.USE_SHORT=false;
this.SALES_TAX_LESS_TRADE=true;
this.DS_INTEREST=KJE.FloatArray(1);
this.DS_INTEREST_HE=KJE.FloatArray(1);
this.DS_PAYMENT=KJE.FloatArray(1);
this.DS_PAYMENT_HE=KJE.FloatArray(1);
this.cats=["Monthly Payment"];
this.CS_INTEREST=["Total Payments"];
this.sSchedule=new KJE.Repeating()
};
KJE.AutoEquityLoanCalc.prototype.clear=function(){this.INTEREST_RATE=0;
this.TERM=0;
this.CASH_DOWN=0;
this.TRADE_ALLOWANCE=0;
this.AMOUNT_OWED_ON_TRADE=0;
this.TITLE_TRANSFER_FEE=0;
this.SALES_TAX_RATE=0;
this.AUTO_SALE_PRICE=0;
this.HOME_EQUITY_RATE=0;
this.HOME_EQUITY_CLOSING_COSTS=0
};
KJE.AutoEquityLoanCalc.prototype.calculate=function(W){var aw=KJE;
var ax=this.INTEREST_RATE;
var R=this.TERM;
var ah=this.CASH_DOWN;
var ay=this.TRADE_ALLOWANCE;
var aB=this.AMOUNT_OWED_ON_TRADE;
var Z=this.TITLE_TRANSFER_FEE;
var aA=this.SALES_TAX_RATE;
var ai=this.AUTO_SALE_PRICE;
var ap=this.HOME_EQUITY_RATE;
var at=this.HOME_EQUITY_CLOSING_COSTS;
var ae=0;
var av=0;
var ao="";
var ad="";
var aa=true;
if(ax<0){throw (this.MSG_ERROR1)
}if(ap<0){throw (this.MSG_ERROR2)
}var af=ah+ay-aB;
var aj=ay-aB;
var ac=(ai-(this.SALES_TAX_LESS_TRADE?ay:0))*(aA/100);
var al=ai+ac+Z-af;
var T=aw.round(KJE.PMT(ax/1200,R,al),2);
if(T<0){throw (this.MSG_ERROR3)
}var au=ai+ac+Z;
var V=al+at;
var aC=aw.round(KJE.PMT(ap/1200,R,V),2);
var ar=Math.round(R);
var S=0;
if(W){var ag=this.sSchedule;
ag.clearRepeat();
if(this.USE_SHORT){ag.addHeader("&nbsp;",{sCell:KJE._sHeadingUnderline,sContent:ag.sReportCol("Auto Loan",1),sFormat:"COLSPAN=2"},{sCell:KJE._sHeadingUnderline,sContent:ag.sReportCol("Home Equity Loan",2),sFormat:"COLSPAN=2"});
ag.addHeader(ag.sReportCol("#",3),ag.sReportCol("Payment",4),ag.sReportCol("Balance",6),ag.sReportCol("Payment",7),ag.sReportCol("Balance",9));
ag.addRepeat("&nbsp;","&nbsp;",aw.dollars(al,2),"&nbsp;",aw.dollars(V,2))
}else{ag.addHeader("&nbsp;",{sCell:KJE._sHeadingUnderline,sContent:ag.sReportCol("Auto Loan",1),sFormat:"COLSPAN=3"},{sCell:KJE._sHeadingUnderline,sContent:ag.sReportCol("Home Equity Loan",2),sFormat:"COLSPAN=3"});
ag.addHeader(ag.sReportCol("#",3),ag.sReportCol("Payment",4),ag.sReportCol("Interest",5),ag.sReportCol("Balance",6),ag.sReportCol("Payment",7),ag.sReportCol("Interest",8),ag.sReportCol("Balance",9));
ag.addRepeat("&nbsp;","&nbsp;","&nbsp;",aw.dollars(al,2),"&nbsp;","&nbsp;",aw.dollars(V,2))
}}var n=al;
var ak=0;
var aq=0;
var ab=T;
var an=V;
var Q=0;
var am=0;
var i=aC;
var X=0;
var az=0;
for(var U=1;
U<=ar;
U++){S=U-1;
if(ar>60){aa=((S%4)==0)
}else{if(ar>30){aa=((S%2)==0)
}else{aa=true
}}ak=aw.round((ax/1200)*n,2);
aq=T-ak;
n-=aq;
if(n<0){ab+=n;
n=0;
aq=ab-ak
}else{ab=T
}if(ar==U){if(n>0.005){ab+=n;
n=0;
aq=ab-ak
}else{n=0
}}Q=aw.round((ap/1200)*an,2);
am=aC-Q;
an-=am;
if(an<0){i+=an;
an=0;
am=i-Q
}else{i=aC
}if(ar==U){if(an>0.005){i+=an;
an=0;
am=i-Q
}else{an=0
}}X+=Q;
az+=ak;
if(W){if(this.USE_SHORT){ag.addRepeat(aw.number(U),aw.dollars(ab,2),aw.dollars(n,2),aw.dollars(i,2),aw.dollars(an,2))
}else{ag.addRepeat(aw.number(U),aw.dollars(ab,2),aw.dollars(ak,2),aw.dollars(n,2),aw.dollars(i,2),aw.dollars(Q,2),aw.dollars(an,2))
}}}var Y=(az+al)-(X+V);
if(Y>0){ao=KJE.replace("DIFFERENCE",aw.dollars(Y),this.MSG_SHORT1);
ad=KJE.replace("DIFFERENCE",aw.dollars(Y),this.MSG_LONG1)
}else{ao=KJE.replace("DIFFERENCE",aw.dollars(Y*(-1)),this.MSG_SHORT2);
ad=KJE.replace("DIFFERENCE",aw.dollars(Y*(-1)),this.MSG_LONG2)
}this.DS_INTEREST[0]=(az+al);
this.DS_INTEREST_HE[0]=(X+V);
this.DS_PAYMENT[0]=T;
this.DS_PAYMENT_HE[0]=aC;
this.MONTHLY_PAYMENT=T;
this.MONTHLY_INCOME=ae;
this.TOTAL_DOWN=af;
this.TOTAL_SALE_PRICE=au;
this.NET_TRADE_IN=aj;
this.SALES_TAX=ac;
this.LOAN_AMOUNT=al;
this.CALC_PAYMENT_AMOUNT=av;
this.RESULTS_MSG=ao;
this.RESULTS_TEXT=ad;
this.HOME_EQUITY_LOAN_AMOUNT=V;
this.HOME_EQUITY_MONTHLY_PAYMENT=aC;
this.HOME_EQUITY_TOTAL_INTEREST=X;
this.AUTO_LOAN_TOTAL_INTEREST=az;
this.DIFFERENCE=Y;
this.TOTAL_TAXES_AND_FEES=ac+Z
};
KJE.AutoEquityLoanCalc.prototype.formatReport=function(b){b.replace("MSG_CHECK_TAX_LESS_TRADE",(this.SALES_TAX_LESS_TRADE?this.MSG_TAX_LESS_TRADE:this.MSG_TAX_NO_TRADE));
b.replace("RESULTS_MSG",this.RESULTS_MSG);
b.replace("RESULTS_TEXT",this.RESULTS_TEXT);
b.dollars("HOME_EQUITY_LOAN_AMOUNT",this.HOME_EQUITY_LOAN_AMOUNT);
b.dollars("HOME_EQUITY_MONTHLY_PAYMENT",this.HOME_EQUITY_MONTHLY_PAYMENT);
b.dollars("HOME_EQUITY_TOTAL_INTEREST",this.HOME_EQUITY_TOTAL_INTEREST);
b.dollars("AUTO_LOAN_TOTAL_INTEREST",this.AUTO_LOAN_TOTAL_INTEREST);
b.percent("HOME_EQUITY_RATE",this.HOME_EQUITY_RATE/100,3);
b.dollars("HOME_EQUITY_CLOSING_COSTS",this.HOME_EQUITY_CLOSING_COSTS);
b.dollars("MONTHLY_PAYMENT",this.MONTHLY_PAYMENT);
b.loanRate("INTEREST_RATE",this.INTEREST_RATE/100);
b.number("TERM",this.TERM);
b.dollars("CASH_DOWN",this.CASH_DOWN);
b.dollars("TRADE_ALLOWANCE",this.TRADE_ALLOWANCE);
b.dollars("AMOUNT_OWED_ON_TRADE",this.AMOUNT_OWED_ON_TRADE);
b.dollars("TITLE_TRANSFER_FEE",this.TITLE_TRANSFER_FEE);
b.taxRate("SALES_TAX_RATE",this.SALES_TAX_RATE/100);
b.dollars("AUTO_SALE_PRICE",this.AUTO_SALE_PRICE);
b.dollars("MONTHLY_INCOME",this.MONTHLY_INCOME);
b.dollars("TOTAL_DOWN",this.TOTAL_DOWN);
b.dollars("NET_TRADE_IN",this.NET_TRADE_IN);
b.dollars("TOTAL_SALE_PRICE",this.TOTAL_SALE_PRICE);
b.dollars("AUTO_SALE_PRICE",this.AUTO_SALE_PRICE);
b.dollars("SALES_TAX",this.SALES_TAX);
b.dollars("LOAN_AMOUNT",this.LOAN_AMOUNT);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CalcName="Home Equity Loan vs. Auto loan Calculator";
KJE.CalcType="autoequityloan";
KJE.CalculatorTitleTemplate="KJE1";
KJE.parseInputs=function(b){return b
};
KJE.initialize=function(){KJE.CalcControl=new KJE.AutoEquityLoanCalc();
KJE.GuiControl=new KJE.AutoEquityLoan(KJE.CalcControl)
};
KJE.AutoEquityLoan=function(r){var y=KJE;
var C=KJE.gLegend;
var x=KJE.inputs.items;
KJE.PercentSlider("INTEREST_RATE","Auto loan interest rate",0,25,2,0.5);
KJE.PercentSlider("HOME_EQUITY_RATE","Home equity interest rate",0,25,2,0.5);
KJE.Slider("TERM","Term in months",12,480,0,y.FMT_NUMBER,6,KJE.s_label[8],KJE.useScale(8));
KJE.DollarSlider("CASH_DOWN","Rebates and Cash Down",0,100000,r.iDecimal,0,1);
KJE.DollarSlider("TRADE_ALLOWANCE","Trade allowance",0,100000,r.iDecimal,0,1);
KJE.DollarSlider("AMOUNT_OWED_ON_TRADE","Amount owed on trade",0,100000,r.iDecimal,0,1);
KJE.DollarSlider("TITLE_TRANSFER_FEE","Fees",0,10000,r.iDecimal,0,7);
KJE.PercentSlider("SALES_TAX_RATE","Sales tax rate",0,20,2,0.5);
KJE.DollarSlider("AUTO_SALE_PRICE","Total purchase price (before tax)",0,5000000,r.iDecimal,0,2);
KJE.Checkbox("SALES_TAX_LESS_TRADE","No Sales tax deduction",false,"Check here if your state does not allow a sales tax deduction for trade-ins");
KJE.DollarSlider("HOME_EQUITY_CLOSING_COSTS","Home equity closing costs",0,2000);
KJE.DropBox("PAYMENT_TYPE","Payments are made");
var u=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE2","Monthly Loan Payments"));
u._legend.setVisible(true);
u._showItemLabel=true;
u._axisX._fSpacingPercent=0.33;
u._legend._iOrientation=(C.TOP_RIGHT);
u._axisX.setVisible(false);
u._axisY.setVisible(true);
var w=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH2",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE1","Total Payments"));
w._legend.setVisible(true);
w._showItemLabel=true;
w._axisX._fSpacingPercent=0.33;
w._legend._iOrientation=(C.TOP_RIGHT);
w._axisX.setVisible(false);
w._axisY.setVisible(true);
var D=KJE.parameters.get("MSG_DROPPER_TITLE","Car financing:");
var A=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Loan amount: KJE1");
var z=function(){return D+"|"+KJE.subText(KJE.getKJEReplaced(A,y.dollars(r.LOAN_AMOUNT)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,z,z),KJE.colorList[0]);
var B=KJE.parameters.get("MSG_DROPPER_DOWNPAYMENT","Down payment:");
var v=KJE.parameters.get("MSG_DROPPER_CLOSEDOWNPAYMENT","KJE1");
var s=function(){return B+"|"+KJE.subText(KJE.getKJEReplaced(v,y.dollars(r.TOTAL_DOWN)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("DOWNPAYMENT",false,s,s),KJE.colorList[0]);
var q=KJE.parameters.get("MSG_DROPPER_TAXES","Taxes and fees:");
var l=KJE.parameters.get("MSG_DROPPER_CLOSETAXES","KJE1");
var t=function(){return q+"|"+KJE.subText(KJE.getKJEReplaced(l,y.dollars(r.TOTAL_TAXES_AND_FEES)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("TAXES",false,t,t),KJE.colorList[0])
};
KJE.AutoEquityLoan.prototype.setValues=function(c){var d=KJE.inputs.items;
c.INTEREST_RATE=d.INTEREST_RATE.getValue();
c.TERM=d.TERM.getValue();
c.CASH_DOWN=d.CASH_DOWN.getValue();
c.TRADE_ALLOWANCE=d.TRADE_ALLOWANCE.getValue();
c.AMOUNT_OWED_ON_TRADE=d.AMOUNT_OWED_ON_TRADE.getValue();
c.TITLE_TRANSFER_FEE=d.TITLE_TRANSFER_FEE.getValue();
c.SALES_TAX_RATE=d.SALES_TAX_RATE.getValue();
c.AUTO_SALE_PRICE=d.AUTO_SALE_PRICE.getValue();
c.HOME_EQUITY_RATE=d.HOME_EQUITY_RATE.getValue();
c.HOME_EQUITY_CLOSING_COSTS=d.HOME_EQUITY_CLOSING_COSTS.getValue();
c.SALES_TAX_LESS_TRADE=!d.SALES_TAX_LESS_TRADE.getValue()
};
KJE.AutoEquityLoan.prototype.refresh=function(i){var j=KJE;
var k=KJE.gLegend;
var g=KJE.inputs.items;
var h=KJE.gGraphs[0];
var l=KJE.gGraphs[1];
KJE.setTitleTemplate(i.RESULTS_MSG);
l.removeAll();
l.setGraphCategories(i.CS_INTEREST);
l.add(new KJE.gGraphDataSeries(i.DS_INTEREST,"Auto Loan",h.getColor(1)));
l.add(new KJE.gGraphDataSeries(i.DS_INTEREST_HE,"Home Equity",h.getColor(2)));
l._axisY._axisMinimum=(i.DS_INTEREST[0]*0.66);
l.paint();
h.removeAll();
h.setGraphCategories(i.cats);
h.add(new KJE.gGraphDataSeries(i.DS_PAYMENT,"Auto Loan",l.getColor(1)));
h.add(new KJE.gGraphDataSeries(i.DS_PAYMENT_HE,"Home Equity",l.getColor(2)));
h._axisY._axisMinimum=(i.DS_PAYMENT[0]*0.66);
h.paint()
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-AUTO_SALE_PRICE'><input id='KJE-AUTO_SALE_PRICE' /></div> <div id='KJE-C-MONTHLY_PAYMENT'><div id='KJE-MONTHLY_PAYMENT' /></div></div> <div id='KJE-C-TERM'><input id='KJE-TERM' /></div> <div id='KJE-C-INTEREST_RATE'><input id='KJE-INTEREST_RATE' /></div> <div id='KJE-C-HOME_EQUITY_RATE'><input id='KJE-HOME_EQUITY_RATE' /></div> <div id='KJE-C-HOME_EQUITY_CLOSING_COSTS'><input id='KJE-HOME_EQUITY_CLOSING_COSTS' /></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-DOWNPAYMENT><div id=KJE-P-DOWNPAYMENT>Input information:</div></div> <div id=KJE-E-DOWNPAYMENT > <div id='KJE-C-CASH_DOWN'><input id='KJE-CASH_DOWN' /></div> <div id='KJE-C-TRADE_ALLOWANCE'><input id='KJE-TRADE_ALLOWANCE' /></div> <div id='KJE-C-AMOUNT_OWED_ON_TRADE'><input id='KJE-AMOUNT_OWED_ON_TRADE' /></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-TAXES><div id=KJE-P-TAXES>Input information:</div></div> <div id=KJE-E-TAXES > <div id='KJE-C-TITLE_TRANSFER_FEE'><input id='KJE-TITLE_TRANSFER_FEE' /></div> <div id='KJE-C-SALES_TAX_RATE'><input id='KJE-SALES_TAX_RATE' /></div> <div id='KJE-C-SALES_TAX_LESS_TRADE'><input id='KJE-SALES_TAX_LESS_TRADE' type=checkbox name='SALES_TAX_LESS_TRADE' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** **GRAPH2** ";
KJE.DefinitionText=" <div id='KJE-D-TERM' ><dt>Term</dt><dd>Number of months for the auto loan.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Auto loan interest rate</dt><dd>Annual interest rate for the auto loan.</dd></div> <div id='KJE-D-TITLE_TRANSFER_FEE' ><dt>Fees</dt><dd>Fee charged for title transfer. Also include any other fees that may be due at delivery.</dd></div> <div id='KJE-D-HOME_EQUITY_RATE' ><dt>Home equity interest rate</dt><dd>Annual interest rate for the home equity loan. Home equity loan interest, as of January 1st 2018, is no longer an allowable itemized deduction on your income taxes.</dd></div> <div id='KJE-D-HOME_EQUITY_CLOSING_COSTS' ><dt>Home equity closing costs</dt><dd>Any additional costs to the home equity loan. This should include any appraiser fees, points paid or other miscellaneous fees.</dd></div> <div id='KJE-D-MONTHLY_PAYMENT' ><dt>Monthly payment</dt><dd>Monthly payment for your auto financing.</dd></div> <div id='KJE-D-AUTO_SALE_PRICE' ><dt>Total purchase price (before tax)</dt><dd>This is the total cost of your auto purchase. Include the cost of the vehicle, additional options and destination charges. Don't include sales tax in this amount. Sales tax will be calculated for you and included in your total after-tax price.</dd></div> <div id='KJE-D-CASH_DOWN' ><dt>Rebates and cash down</dt><dd>Total amount of cash and/or factory rebates used in this purchase. The larger your cash down payment the smaller the loan you will need to finance this purchase.</dd></div> <div id='KJE-D-TRADE_ALLOWANCE' ><dt>Trade allowance</dt><dd>The total amount that you are given for any automobile that you trade-in as part of this purchase. In some states a trade-in can also reduce the amount of sales tax you will owe. See the definition for &quot;No sales tax deduction for trade-in&quot; for more information on trade-in vehicles and sales tax.</dd></div> <div id='KJE-D-AMOUNT_OWED_ON_TRADE' ><dt>Amount owed on trade</dt><dd>Total loan balance still outstanding on the trade-in.</dd></div> <div id='KJE-D-SALES_TAX_RATE' ><dt>Sales tax rate</dt><dd>Sales tax percentage rate charged on this purchase.</dd></div> <div id='KJE-D-SALES_TAX_LESS_TRADE' ><dt>No sales tax deduction for trade-in</dt><dd>If you live in a state where your sales tax is calculated on your full purchase price, check this box. If this box is unchecked, sales tax is calculated on the purchase price less trade-in. Currently California, the District of Columbia, Hawaii and Michigan allow no deductions for trade-ins when calculating sales tax. In addition, Alaska, Delaware, Montana and New Hampshire have no sales tax on auto purchases. Oregon currently only collects tax on new vehicles.</dd></div> ";
KJE.ReportText=' <!--HEADING "Auto Loan vs. Home Equity Loan" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>RESULTS_MSG. </h2> RESULTS_TEXT **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Auto Loan vs. Home Equity Loan Results</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><td class="KJEHeading KJECell60">&nbsp;</td><th class="KJEHeading KJECell20" scope=\'col\'>Auto Loan</th><th class="KJEHeading KJECell20" scope=\'col\'>Home Equity Loan</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan amount</th><td class="KJECell KJECellBorder" >LOAN_AMOUNT</td><td class="KJECell" >HOME_EQUITY_LOAN_AMOUNT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Monthly payment</th><td class="KJECell KJECellBorder">MONTHLY_PAYMENT</td><td class="KJECell">HOME_EQUITY_MONTHLY_PAYMENT</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate</th><td class="KJECell KJECellBorder">INTEREST_RATE</td><td class="KJECell">HOME_EQUITY_RATE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Term</th><td class="KJECell KJECellBorder">TERM months</td><td class="KJECell">TERM months</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest paid*</th><td class="KJECell KJECellBorder">AUTO_LOAN_TOTAL_INTEREST</td><td class="KJECell">HOME_EQUITY_TOTAL_INTEREST</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel" COLSPAN=3><div class="KJECenter">RESULTS_MSG.</div></th></tr> </tfoot> </table> </div> <div class=KJEInset> *This assumes that you do not refinance and that all payments are made on time with no prepayments. Home equity loan interest, as of January 1st 2018, is no longer an allowable itemized deduction on your income taxes. </div> **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Auto Purchase Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Total purchase price (before tax):</th><td class="KJECell KJECell40">AUTO_SALE_PRICE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Sales tax**:</th><td class="KJECell">SALES_TAX</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Fees:</th><td class="KJECell">TITLE_TRANSFER_FEE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total sales price (after-tax & fees):</th><td class="KJECell">TOTAL_SALE_PRICE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total down payment***:</th><td class="KJECell">TOTAL_DOWN</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan amount:</th><td class="KJECellStrong">LOAN_AMOUNT</td></tr> </tfoot> </table> </div> <div class=KJEInset> **MSG_CHECK_TAX_LESS_TRADE Currently California, the District of Columbia, Hawaii and Michigan allow no deductions for trade-ins when calculating sales tax. If you live in one of these states make sure to check the box "No sales tax deduction for trade-in" on the main calculator page. <p>***Your total down payment is calculated as your rebates and cash down payment of CASH_DOWN plus your trade-in allowance of TRADE_ALLOWANCE minus the AMOUNT_OWED_ON_TRADE balance outstanding on your trade-in vehicle. </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment Schedule</h2> **REPEATING GROUP** ';
KJE.parameters.set("AMOUNT_OWED_ON_TRADE",4000);
KJE.parameters.set("AUTO_SALE_PRICE",20000);
KJE.parameters.set("CASH_DOWN",1500);
KJE.parameters.set("HOME_EQUITY_CLOSING_COSTS",0);
KJE.parameters.set("HOME_EQUITY_RATE",KJE.Default.RateAdj);
KJE.parameters.set("INTEREST_RATE",KJE.Default.RateAuto);
KJE.parameters.set("SALES_TAX_RATE",7);
KJE.parameters.set("TERM",60);
KJE.parameters.set("TITLE_TRANSFER_FEE",40);
KJE.parameters.set("TRADE_ALLOWANCE",5000);
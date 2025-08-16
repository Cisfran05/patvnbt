KJE.AutoRebateCalc=function(){this.INTEREST_RATE=KJE.FloatArray(2);
this.MANUFACTURER_REBATE=KJE.FloatArray(2);
this.MONTHLY_PAYMENT=KJE.FloatArray(2);
this.TOTAL_DOWN=KJE.FloatArray(2);
this.AUTO_AFREBATE_PRICE=KJE.FloatArray(2);
this.SALES_TAX=KJE.FloatArray(2);
this.TOTAL_SALE_PRICE=KJE.FloatArray(2);
this.LOAN_AMOUNT=KJE.FloatArray(2);
this.INTEREST_PAID=KJE.FloatArray(2);
this.TOTAL_OF_PAYMENTS=KJE.FloatArray(2);
this.TERM=0;
this.CASH_DOWN=0;
this.TRADE_ALLOWANCE=0;
this.AMOUNT_OWED_ON_TRADE=0;
this.NONTAX_FEES=0;
this.TAXABLE_FEES=0;
this.TOTAL_FEES=0;
this.SALES_TAX_RATE=0;
this.AUTO_SALE_PRICE=0;
this.NET_TRADE_IN=0;
this.CALC_PAYMENT_AMOUNT=0;
this.SALES_TAX_LESS_TRADE=true;
this.SALES_TAX_BEFORE_REBATE=KJE.parameters.get("SALES_TAX_BEFORE_REBATE",false);
this.MSG_ERROR2="Your monthly payment is zero.";
this.nBalance=KJE.FloatArray(2);
this.nInterest=KJE.FloatArray(2);
this.nPrincipal=KJE.FloatArray(2);
this.nPayment=KJE.FloatArray(2);
this.MSG_RESULTS1=KJE.parameters.get("MSG_RESULTS1","Manufacturer rebate could save you CALC_AMOUNT in total payments.");
this.MSG_RESULTS2=KJE.parameters.get("MSG_RESULTS2","Low interest financing could save you CALC_AMOUNT in total payments.");
this.MSG_RESULTS="";
this.MSG_TAX_LESS_TRADE_NOREBATE=KJE.parameters.get("MSG_TAX_LESS_TRADE_NOREBATE",'Sales tax was calculated as this.SALES_TAX_RATE times your after rebate price minus your trade-in allowance of this.TRADE_ALLOWANCE. If your state charges sales tax before a rebate is applied, make sure to check the box "Calculate sales tax on the vehicle price before rebate".');
this.MSG_TAX_NO_TRADE_REBATE=KJE.parameters.get("MSG_TAX_NO_TRADE_REBATE",'Sales tax was calculated as this.SALES_TAX_RATE times your after rebate price. No deduction was included for your trade-in allowance of this.TRADE_ALLOWANCE. If your state charges sales tax before a rebate is applied, make sure to check the box "Calculate sales tax on vehicle price after rebate".');
this.MSG_TAX_LESS_TRADE_REBATE=KJE.parameters.get("MSG_TAX_LESS_TRADE_REBATE",'Sales tax was calculated as this.SALES_TAX_RATE times your vehicle price of this.AUTO_SALE_PRICE minus your trade-in allowance of this.TRADE_ALLOWANCE. If your state charges sales tax on an after rebate price, make sure to uncheck the box "Calculate sales tax on the vehicle price before rebate".');
this.MSG_TAX_NO_TRADE_NOREBATE=KJE.parameters.get("MSG_TAX_NO_TRADE_NOREBATE",'Sales tax was calculated as this.SALES_TAX_RATE times your vehicle price of this.AUTO_SALE_PRICE. No deduction was included for your trade-in allowance of this.TRADE_ALLOWANCE. If your state charges sales tax on an after rebate price, make sure to uncheck the box "Calculate sales tax on the vehicle price before rebate".');
this.DS_BALANCE1=KJE.FloatArray(2);
this.DS_BALANCE2=KJE.FloatArray(2);
this.cats=["Loan Amount","Total Payments"];
this.cats[0]=KJE.parameters.get("MSG_CAT1",this.cats[0]);
this.cats[1]=KJE.parameters.get("MSG_CAT2",this.cats[1]);
this.sSchedule=new KJE.Repeating()
};
KJE.AutoRebateCalc.prototype.clear=function(){};
KJE.AutoRebateCalc.prototype.calculate=function(n){var k=KJE;
this.NET_TRADE_IN=this.TRADE_ALLOWANCE-this.AMOUNT_OWED_ON_TRADE;
this.TOTAL_FEES=this.NONTAX_FEES+this.TAXABLE_FEES;
this.MANUFACTURER_REBATE[1]=0;
for(var h=0;
h<this.MONTHLY_PAYMENT.length;
h++){this.TOTAL_DOWN[h]=this.CASH_DOWN+this.TRADE_ALLOWANCE-this.AMOUNT_OWED_ON_TRADE;
this.AUTO_AFREBATE_PRICE[h]=this.AUTO_SALE_PRICE-this.MANUFACTURER_REBATE[h];
this.SALES_TAX[h]=(this.AUTO_AFREBATE_PRICE[h]+(this.SALES_TAX_BEFORE_REBATE?this.MANUFACTURER_REBATE[h]:0)-(this.SALES_TAX_LESS_TRADE?this.TRADE_ALLOWANCE:0)+this.TAXABLE_FEES)*(this.SALES_TAX_RATE/100);
this.TOTAL_SALE_PRICE[h]=this.AUTO_AFREBATE_PRICE[h]+this.SALES_TAX[h]+this.TOTAL_FEES;
this.LOAN_AMOUNT[h]=this.TOTAL_SALE_PRICE[h]-this.TOTAL_DOWN[h];
this.LOAN_AMOUNT[h]=(this.LOAN_AMOUNT[h]<0?0:this.LOAN_AMOUNT[h]);
this.MONTHLY_PAYMENT[h]=k.round(KJE.PMT(this.INTEREST_RATE[h]/1200,this.TERM,this.LOAN_AMOUNT[h]),2)
}var m=Math.round(this.TERM);
if(n){var i=this.sSchedule;
i.clearRepeat();
i.addHeader("&nbsp;",{sCell:KJE._sHeadingUnderline,sContent:KJE.replace("INTEREST_RATE1",k.percent(this.INTEREST_RATE[1]/100,2),i.sReportCol("INTEREST_RATE1 Low Interest Financing",1)),sFormat:"COLSPAN=3"},{sCell:KJE._sHeadingUnderline,sContent:KJE.replace("MANUFACTURER_REBATE2",k.dollars(this.MANUFACTURER_REBATE[0]),i.sReportCol("MANUFACTURER_REBATE2 Manufacturer's Rebate",2)),sFormat:"COLSPAN=3"});
i.addHeader(i.sReportCol("#",3),i.sReportCol("Payment",4),i.sReportCol("Interest",5),i.sReportCol("Balance",6),i.sReportCol("Payment",4),i.sReportCol("Interest",5),i.sReportCol("Balance",6));
i.addRepeat("&nbsp;","&nbsp;","&nbsp;",k.dollars(this.LOAN_AMOUNT[1],2),"&nbsp;","&nbsp;",k.dollars(this.LOAN_AMOUNT[0],2))
}this.nBalance[0]=this.LOAN_AMOUNT[0];
this.nInterest[0]=0;
this.nPrincipal[0]=0;
this.nPayment[0]=this.MONTHLY_PAYMENT[0];
this.nBalance[1]=this.LOAN_AMOUNT[1];
this.nInterest[1]=0;
this.nPrincipal[1]=0;
this.nPayment[1]=this.MONTHLY_PAYMENT[1];
this.INTEREST_PAID[0]=0;
this.INTEREST_PAID[1]=0;
this.TOTAL_OF_PAYMENTS[0]=0;
this.TOTAL_OF_PAYMENTS[1]=0;
var h=0;
for(var j=1;
j<=m;
j++){for(var l=0;
l<this.MONTHLY_PAYMENT.length;
l++){this.nInterest[l]=k.round((this.INTEREST_RATE[l]/1200)*this.nBalance[l],2);
this.nPrincipal[l]=this.MONTHLY_PAYMENT[l]-this.nInterest[l];
this.nBalance[l]-=this.nPrincipal[l];
if(this.nBalance[l]<0){this.nPayment[l]+=this.nBalance[l];
this.nBalance[l]=0;
this.nPrincipal[l]=this.nPayment[l]-this.nInterest[l]
}else{this.nPayment[l]=this.MONTHLY_PAYMENT[l]
}if(m==j){if(this.nBalance[l]>0.005){this.nPayment[l]+=this.nBalance[l];
this.nBalance[l]=0;
this.nPrincipal[l]=this.nPayment[l]-this.nInterest[l]
}else{this.nBalance[l]=0
}}this.INTEREST_PAID[l]+=this.nInterest[l];
this.TOTAL_OF_PAYMENTS[l]+=this.nPayment[l]
}if(n){i.addRepeat(k.number(j),k.dollars(this.nPayment[1],2),k.dollars(this.nInterest[1],2),k.dollars(this.nBalance[1],2),k.dollars(this.nPayment[0],2),k.dollars(this.nInterest[0],2),k.dollars(this.nBalance[0],2))
}}if(this.TOTAL_OF_PAYMENTS[1]>this.TOTAL_OF_PAYMENTS[0]){this.MSG_RESULTS=KJE.replace("CALC_AMOUNT",k.dollars(this.TOTAL_OF_PAYMENTS[1]-this.TOTAL_OF_PAYMENTS[0]),this.MSG_RESULTS1)
}else{this.MSG_RESULTS=KJE.replace("CALC_AMOUNT",k.dollars(this.TOTAL_OF_PAYMENTS[0]-this.TOTAL_OF_PAYMENTS[1]),this.MSG_RESULTS2)
}this.DS_BALANCE1[0]=this.LOAN_AMOUNT[0];
this.DS_BALANCE2[0]=this.LOAN_AMOUNT[1];
this.DS_BALANCE1[1]=this.TOTAL_OF_PAYMENTS[0];
this.DS_BALANCE2[1]=this.TOTAL_OF_PAYMENTS[1]
};
KJE.AutoRebateCalc.prototype.formatReport=function(c){c.replace("MSG_RESULTS",this.MSG_RESULTS);
c.number("TERM",this.TERM);
c.dollars("CASH_DOWN",this.CASH_DOWN);
if(this.SALES_TAX_LESS_TRADE&&this.SALES_TAX_BEFORE_REBATE){c.replace("MSG_CHECK_TAX_LESS_TRADE",this.MSG_TAX_LESS_TRADE_REBATE)
}else{if(!this.SALES_TAX_LESS_TRADE&&!this.SALES_TAX_BEFORE_REBATE){c.replace("MSG_CHECK_TAX_LESS_TRADE",this.MSG_TAX_NO_TRADE_REBATE)
}else{if(this.SALES_TAX_LESS_TRADE&&!this.SALES_TAX_BEFORE_REBATE){c.replace("MSG_CHECK_TAX_LESS_TRADE",this.MSG_TAX_LESS_TRADE_NOREBATE)
}else{c.replace("MSG_CHECK_TAX_LESS_TRADE",this.MSG_TAX_NO_TRADE_NOREBATE)
}}}c.dollars("TRADE_ALLOWANCE",this.TRADE_ALLOWANCE);
c.dollars("AMOUNT_OWED_ON_TRADE",this.AMOUNT_OWED_ON_TRADE);
c.dollars("NONTAX_FEES",this.NONTAX_FEES);
c.dollars("TAXABLE_FEES",this.TAXABLE_FEES);
c.dollars("TITLE_TRANSFER_FEE",this.NONTAX_FEES);
c.dollars("TOTAL_FEES",this.TOTAL_FEES);
c.taxRate("SALES_TAX_RATE",this.SALES_TAX_RATE/100);
c.dollars("AUTO_SALE_PRICE",this.AUTO_SALE_PRICE);
c.dollars("NET_TRADE_IN",this.NET_TRADE_IN);
c.dollars("AUTO_SALE_PRICE",this.AUTO_SALE_PRICE);
for(var d=0;
d<this.MONTHLY_PAYMENT.length;
d++){c.dollars("INTEREST_PAID"+(d+1),this.INTEREST_PAID[d]);
c.dollars("TOTAL_OF_PAYMENTS"+(d+1),this.TOTAL_OF_PAYMENTS[d]);
c.loanRate("INTEREST_RATE"+(d+1),this.INTEREST_RATE[d]/100);
c.dollars("MANUFACTURER_REBATE"+(d+1),this.MANUFACTURER_REBATE[d]);
c.dollars("MONTHLY_PAYMENT"+(d+1),this.MONTHLY_PAYMENT[d]);
c.dollars("TOTAL_DOWN"+(d+1),this.TOTAL_DOWN[d]);
c.dollars("AUTO_AFREBATE_PRICE"+(d+1),this.AUTO_AFREBATE_PRICE[d]);
c.dollars("SALES_TAX"+(d+1),this.SALES_TAX[d]);
c.dollars("TOTAL_SALE_PRICE"+(d+1),this.TOTAL_SALE_PRICE[d]);
c.dollars("LOAN_AMOUNT"+(d+1),this.LOAN_AMOUNT[d])
}c.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CalcName="Auto Rebate vs. Low Interest Financing Calculator";
KJE.CalcType="AutoRebate";
KJE.CalculatorTitle="Auto Rebate vs. Low Interest Financing";
KJE.parseInputs=function(b){return b
};
KJE.initialize=function(){KJE.CalcControl=new KJE.AutoRebateCalc();
KJE.GuiControl=new KJE.AutoRebate(KJE.CalcControl)
};
KJE.AutoRebate=function(p){var u=KJE;
var y=KJE.gLegend;
var t=KJE.inputs.items;
var l=KJE.parameters.get("USE_TALL",false);
this.MSG_PER_MONTH=KJE.parameters.get("MSG_PER_MONTH","monthly");
this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","INTEREST_RATE Financing");
this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","MANUFACTURER_REBATE Rebate");
KJE.PercentSlider("INTEREST_RATE1","Low interest financing",0,25,2);
KJE.PercentSlider("INTEREST_RATE2","Traditional financing",0,25,2);
KJE.DollarSlider("MANUFACTURER_REBATE","Manufacturer rebate",0,20000);
KJE.NumberSlider("TERM","Term in months",12,120,0);
KJE.DollarSlider("CASH_DOWN","Cash down",0,100000);
KJE.DollarSlider("TRADE_ALLOWANCE","Trade allowance",0,100000);
KJE.DollarSlider("AMOUNT_OWED_ON_TRADE","Amount owed on trade",0,100000);
KJE.DollarSlider("NONTAX_FEES","Fees (non-taxable)",0,10000);
KJE.DollarSlider("TAXABLE_FEES","Fees (taxable)",0,10000);
KJE.PercentSlider("SALES_TAX_RATE","Sales tax rate",0,30,2);
KJE.DollarSlider("AUTO_SALE_PRICE","Total price (before tax)",100,250000,0,0,3);
KJE.Label("MONTHLY_PAYMENT2","Rebate payment",null,null,"KJEBold");
KJE.Label("MONTHLY_PAYMENT1","Low interest payment",null,null,"KJEBold");
KJE.Checkbox("SALES_TAX_BEFORE_REBATE","Sales tax before rebate",false,"Check here if your state calculates sales tax before rebate");
KJE.Checkbox("SALES_TAX_LESS_TRADE","No Sales tax deduction",false,"Check here if your state does not allow a sales tax deduction for trade-ins");
var s=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],p.MSG_RESULTS2);
s._legend._iOrientation=(y.TOP_RIGHT);
s._showItemLabel=true;
s._axisX._fSpacingPercent=0.75;
var z=KJE.parameters.get("MSG_DROPPER_TITLE","Auto financing:");
var w=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 vs. KJE2 with a KJE3 rebate");
var v=function(){return z+KJE.subText(KJE.getKJEReplaced(w,t.INTEREST_RATE1.getFormatted(),t.INTEREST_RATE2.getFormatted(),t.MANUFACTURER_REBATE.getFormatted()),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,z,v),KJE.colorList[0]);
var x=KJE.parameters.get("MSG_DROPPER_DOWNPAYMENT","Down payment:");
var q=function(){return x+KJE.subText(KJE.shortDesc(t.CASH_DOWN,t.TRADE_ALLOWANCE,t.AMOUNT_OWED_ON_TRADE),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("DOWNPAYMENT",false,x,q),KJE.colorList[0]);
if(KJE.DropperDefined("TAXES")){var o=KJE.parameters.get("MSG_DROPPER_TAXES","Taxes and fees:");
var r=function(){return o+KJE.subText(KJE.shortDesc(t.NONTAX_FEES,t.TAXABLE_FEES,t.SALES_TAX_RATE),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("TAXES",false,r,r),KJE.colorList[0])
}};
KJE.AutoRebate.prototype.setValues=function(c){var d=KJE.inputs.items;
c.INTEREST_RATE[1]=d.INTEREST_RATE1.getValue();
c.MANUFACTURER_REBATE[0]=d.MANUFACTURER_REBATE.getValue();
c.AUTO_SALE_PRICE=d.AUTO_SALE_PRICE.getValue();
c.INTEREST_RATE[0]=d.INTEREST_RATE2.getValue();
c.TERM=d.TERM.getValue();
c.CASH_DOWN=d.CASH_DOWN.getValue();
c.TRADE_ALLOWANCE=d.TRADE_ALLOWANCE.getValue();
c.AMOUNT_OWED_ON_TRADE=d.AMOUNT_OWED_ON_TRADE.getValue();
c.NONTAX_FEES=d.NONTAX_FEES.getValue();
c.TAXABLE_FEES=d.TAXABLE_FEES.getValue();
c.SALES_TAX_RATE=d.SALES_TAX_RATE.getValue();
c.SALES_TAX_LESS_TRADE=!(d.SALES_TAX_LESS_TRADE.getValue());
c.SALES_TAX_BEFORE_REBATE=d.SALES_TAX_BEFORE_REBATE.getValue()
};
KJE.AutoRebate.prototype.refresh=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
g.removeAll();
g.setGraphCategories(h.cats);
g.add(new KJE.gGraphDataSeries(h.DS_BALANCE1,KJE.replace("MANUFACTURER_REBATE",i.dollars(h.MANUFACTURER_REBATE[0]),this.MSG_GRAPH2),g.getColor(2)));
g.add(new KJE.gGraphDataSeries(h.DS_BALANCE2,KJE.replace("INTEREST_RATE",i.percent(h.INTEREST_RATE[1]/100,2),this.MSG_GRAPH1),g.getColor(1)));
g.setTitle(h.MSG_RESULTS);
g.paint();
f.MONTHLY_PAYMENT2.setText(i.dollars(h.MONTHLY_PAYMENT[0])+" "+this.MSG_PER_MONTH);
f.MONTHLY_PAYMENT1.setText(i.dollars(h.MONTHLY_PAYMENT[1])+" "+this.MSG_PER_MONTH)
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-AUTO_SALE_PRICE'><input id='KJE-AUTO_SALE_PRICE' /></div> <div id='KJE-C-TERM'><input id='KJE-TERM' /></div> <div id='KJE-C-SALES_TAX_RATE'><input id='KJE-SALES_TAX_RATE' /></div> <div id='KJE-C-INTEREST_RATE1'><input id='KJE-INTEREST_RATE1' /></div> <div id='KJE-C-INTEREST_RATE2'><input id='KJE-INTEREST_RATE2' /></div> <div id='KJE-C-MANUFACTURER_REBATE'><input id='KJE-MANUFACTURER_REBATE' /></div> <div id='KJE-C-MONTHLY_PAYMENT2'><div id='KJE-MONTHLY_PAYMENT2'></div></div> <div id='KJE-C-MONTHLY_PAYMENT1'><div id='KJE-MONTHLY_PAYMENT1'></div></div> </div> <div id=KJE-D-DOWNPAYMENT><div id=KJE-P-DOWNPAYMENT>Input information:</div></div> <div id=KJE-E-DOWNPAYMENT > <div id='KJE-C-CASH_DOWN'><input id='KJE-CASH_DOWN' /></div> <div id='KJE-C-TRADE_ALLOWANCE'><input id='KJE-TRADE_ALLOWANCE' /></div> <div id='KJE-C-AMOUNT_OWED_ON_TRADE'><input id='KJE-AMOUNT_OWED_ON_TRADE' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-AUTO_SALE_PRICE' ><dt>Total purchase price (before tax)</dt><dd>This is the total cost of your auto purchase. Include the cost of the vehicle, any additional options and any destination charges. Don't include sales tax in this amount. Sales tax will be calculated for you and included in your total after-tax price.</dd></div> <div id='KJE-D-TERM' ><dt>Term in months</dt><dd>Number of months for your auto loan.</dd></div> <div id='KJE-D-CASH_DOWN' ><dt>Cash down</dt><dd>Total amount of cash used in this purchase. The larger your cash down payment the smaller the loan you will need to finance this purchase.</dd></div> <div id='KJE-D-TRADE_ALLOWANCE' ><dt>Trade allowance</dt><dd>The total amount that you are given for any automobile that you trade-in as part of this purchase. In some states a trade-in can also reduce the amount of sales tax you will owe. See the definition for 'Sales tax deduction for trade-in' for more information on trade-in vehicles and sales tax.</dd></div> <div id='KJE-D-AMOUNT_OWED_ON_TRADE' ><dt>Amount owed on trade</dt><dd>Total loan balance still outstanding on the trade-in.</dd></div> <div id='KJE-D-SALES_TAX_RATE' ><dt>Sales tax rate</dt><dd>Sales tax percentage rate charged on this purchase.</dd></div> <div id='KJE-D-INTEREST_RATE2' ><dt>Traditional financing</dt><dd>The interest rate you may be able to receive from a bаոk, credit union or other lender. This is usually a higher interest rate than the manufacturer's low interest financing, but is often very competitive when used in combination with a manufacturer rebate. This calculator assumes that if you choose a manufacturer rebate you are not eligible for manufacturer low interest financing.</dd></div> <div id='KJE-D-INTEREST_RATE1' ><dt>Low interest financing</dt><dd>The incentive interest rate you may be able to receive from an auto manufacturer. These rates are usually significantly below standard auto loan interest rates. Low interest financing can be as little as 0% per year. Most manufacturers allow you to choose either low interest financing or a manufacturer rebate, but not both. This calculator assumes that if you choose low interest financing you are not eligible for any manufacturer rebate.</dd></div> <div id='KJE-D-MANUFACTURER_REBATE' ><dt>Manufacturer rebate</dt><dd>A cash rebate paid by the auto manufacturer to you when you purchase a new vehicle. Most manufacturers allow you to choose either low interest financing or a manufacturer rebate, but not both.</dd></div> <div id='KJE-D-SALES_TAX_LESS_TRADE' ><dt>No sales tax deduction for trade-in</dt><dd>If you live in a state where your sales tax is calculated on your full purchase price check this box. If this box is unchecked sales tax is calculated on the purchase price less trade-in. Currently California, the District of Columbia, Hawaii and Michigan allow no deductions for trade-ins when calculating sales tax. In addition, Alaska, Delaware, Montana and New Hampshire have no sales tax on auto purchases. Oregon currently only collects tax on new vehicles.</dd></div> <div id='KJE-D-TAX_BEFORE_REBATE' ><dt>Calculate sales tax before rebate</dt><dd>Some states will calculate sales tax on your purchase price before a manufacturer's rebate is applied. If your state calculates sales tax on the vehicle price before the rebate is applied, check this box.</dd></div> ";
KJE.ReportText=' <!--HEADING "Auto Rebate vs. Low Interest Financing" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>MSG_RESULTS</h2>Choosing the manufacturer rebate of MANUFACTURER_REBATE1 results in a loan of LOAN_AMOUNT1 with a monthly payment of MONTHLY_PAYMENT1. A low interest incentive loan at INTEREST_RATE2 results in a loan of LOAN_AMOUNT2 with a monthly payment of MONTHLY_PAYMENT2. The total of all of your payments*** would be TOTAL_OF_PAYMENTS1 for the manufacturer rebate option and TOTAL_OF_PAYMENTS2 for the low interest incentive option.<p>**GRAPH** <div class=KJEReportTableDiv> <table class=KJEReportTable> <caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><td class="KJEHeading KJECell50">&nbsp;</td><th class="KJEHeading KJECell25" scope=\'col\'>INTEREST_RATE2 Low Interest<BR>Financing</th><th class="KJEHeading KJECell25" scope=\'col\'>MANUFACTURER_REBATE1 Manufacturer<BR> Rebate</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell50" scope=\'row\'>Interest rate:</th><td class="KJECell KJECellBorder KJECell25">INTEREST_RATE2</td><td class="KJECell KJECell25">INTEREST_RATE1</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Term in months:</th><td class="KJECell KJECellBorder">TERM</td><td class="KJECell">TERM</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total purchase price (before tax):</th><td class="KJECell KJECellBorder">AUTO_SALE_PRICE</td><td class="KJECell">AUTO_SALE_PRICE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Manufacturer rebate:</th><td class="KJECell KJECellBorder">MANUFACTURER_REBATE2</td><td class="KJECell">MANUFACTURER_REBATE1</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Price after rebate:</th><td class="KJECell KJECellBorder">AUTO_AFREBATE_PRICE2</td><td class="KJECell">AUTO_AFREBATE_PRICE1</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Sales tax*:</th><td class="KJECell KJECellBorder">SALES_TAX2</td><td class="KJECell">SALES_TAX1</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total sales price (after-tax):</th><td class="KJECell KJECellBorder">TOTAL_SALE_PRICE2</td><td class="KJECell">TOTAL_SALE_PRICE1</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total down payment**:</th><td class="KJECell KJECellBorder">TOTAL_DOWN2</td><td class="KJECell">TOTAL_DOWN1</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan amount:</th><td class="KJECellStrong KJECellBorder">LOAN_AMOUNT2</td><td class="KJECellStrong">LOAN_AMOUNT1</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Monthly payment:</th><td class="KJECellStrong KJECellBorder">MONTHLY_PAYMENT2</td><td class="KJECellStrong">MONTHLY_PAYMENT1</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total payments***:</th><td class="KJECellStrong KJECellBorder">TOTAL_OF_PAYMENTS2</td><td class="KJECellStrong">TOTAL_OF_PAYMENTS1</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest paid***:</th><td class="KJECellStrong KJECellBorder">INTEREST_PAID2</td><td class="KJECellStrong">INTEREST_PAID1</td></tr> </tfoot> </table> </div> <p class=KJEFooter>*MSG_CHECK_TAX_LESS_TRADE Currently California, the District of Columbia, Hawaii and Michigan allow no deductions for trade-ins when calculating sales tax. If you live in one of these states make sure to check the box "No sales tax deduction for trade-in" on the main calculator page.</p> <p class=KJEFooter>**Your total down payment is calculated as your cash down payment of CASH_DOWN plus your trade-in allowance of TRADE_ALLOWANCE minus the AMOUNT_OWED_ON_TRADE loan balance outstanding on your trade-in vehicle.</p> <p class=KJEFooter>***This assumes that you do not refinance your loan and that all payments are made on time with no prepayments of the loan.</p> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment Schedule</h2> **REPEATING GROUP** ';
KJE.parameters.set("AMOUNT_OWED_ON_TRADE",4000);
KJE.parameters.set("AUTO_SALE_PRICE",20000);
KJE.parameters.set("CASH_DOWN",1500);
KJE.parameters.set("INTEREST_RATE2",KJE.Default.RateAuto);
KJE.parameters.set("INTEREST_RATE1",KJE.Default.RateAutoLow);
KJE.parameters.set("MANUFACTURER_REBATE",2500);
KJE.parameters.set("MONTHLY_PAYMENT",300);
KJE.parameters.set("NONTAX_FEES",0);
KJE.parameters.set("SALES_TAX_LESS_TRADE",false);
KJE.parameters.set("SALES_TAX_BEFORE_REBATE",false);
KJE.parameters.set("SALES_TAX_RATE",6);
KJE.parameters.set("TAXABLE_FEES",0);
KJE.parameters.set("TERM",48);
KJE.parameters.set("TRADE_ALLOWANCE",5000);
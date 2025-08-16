KJE.AutoLoanCalc=function(){this.iDecimal=2;
this.TOTAL_FEES=0;
this.PERIOD_LABEL="";
this.ANNUAL_PERIODS=KJE.Default.PAY_MONTHLY;
this.PAYMENT_CALC=true;
this.SALES_TAX_LESS_TRADE=true;
this.YEAR=false;
this.MSG_TITLE_PAYMENT=KJE.parameters.get("MSG_TITLE_PAYMENT","Car payment is KJE1 KJE2.");
this.MSG_TITLE_AMOUNT=KJE.parameters.get("MSG_TITLE_AMOUNT","Car purchase price is KJE3.");
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Interest rate must be greater than or equal to zero.");
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Your monthly payment is zero.");
this.MSG_TAX_LESS_TRADE=KJE.parameters.get("MSG_TAX_LESS_TRADE","Sales tax was calculated as SALES_TAX_RATE times your vehicle price of AUTO_SALE_PRICE minus your trade-in allowance of TRADE_ALLOWANCE.");
this.MSG_TAX_NO_TRADE=KJE.parameters.get("MSG_TAX_NO_TRADE","Sales tax was calculated as SALES_TAX_RATE times your vehicle price of AUTO_SALE_PRICE. No deduction was included for you trade-in allowance of TRADE_ALLOWANCE.");
this.MSG_DOWNPAYMENT=KJE.parameters.get("MSG_DOWNPAYMENT","Down Payment");
this.DS_BALANCE=null;
this.DS_DOWNPAYMENT=KJE.FloatArray(4);
this.DS_CHANGE_TERM=KJE.FloatArray(4);
this.cats=null;
this.CS_DOWNPAYMENT=new Array(4);
this.CS_CHANGE_TERM=new Array(4);
this.sSchedule=new KJE.Repeating()
};
KJE.AutoLoanCalc.prototype.clear=function(){this.ANNUAL_INCOME=0;
this.MONTHLY_PAYMENT=0;
this.INTEREST_RATE=0;
this.TERM=0;
this.CASH_DOWN=0;
this.TRADE_ALLOWANCE=0;
this.AMOUNT_OWED_ON_TRADE=0;
this.NONTAX_FEES=0;
this.TAXABLE_FEES=0;
this.SALES_TAX_RATE=0;
this.AUTO_SALE_PRICE=0;
this.DEBT_LOAD_PERCENT=20;
this.MONTHLY_PAYMENT=0;
this.CASH_DOWN=0;
this.PERCENT_DOWN=0;
this.PAYMENT_TYPE=KJE.Default.PAY_MONTHLY
};
KJE.AutoLoanCalc.prototype.calculate=function(ak){var aI=KJE;
var aQ=this.ANNUAL_INCOME;
var ad=this.MONTHLY_PAYMENT;
var aJ=this.INTEREST_RATE;
var q=this.TERM;
var au=this.CASH_DOWN;
var aK=this.TRADE_ALLOWANCE;
var aN=this.AMOUNT_OWED_ON_TRADE;
var aA=this.NONTAX_FEES;
var Z=this.TAXABLE_FEES;
var aM=this.SALES_TAX_RATE;
var av=this.AUTO_SALE_PRICE;
var aO=this.DEBT_LOAD_PERCENT;
var az=this.PERCENT_DOWN;
var aL=this.PAYMENT_TYPE;
this.ANNUAL_PERIODS=KJE.Default.PAY_PERIOD[aL];
this.PERIOD_LABEL=KJE.Default.PAY_SELECTIONS[aL];
this.PERIOD_DESC=KJE.Default.PAY_DESC[aL];
this.PERIOD_PAY_PER=KJE.Default.PAY_PER[aL];
var ar=0;
var aP=0;
var aq=0;
var ao=0;
var ay=0;
var aH=0;
var aB=0;
var aC=0;
var aD=0;
var aE=0;
var n=0;
var Y=0;
var aa=0;
var ac=0;
if(aJ<0){throw (this.MSG_ERROR1)
}this.NET_TRADE_IN=aK-aN;
if(!this.PAYMENT_CALC){if(aQ>0&&aO>0){ad=aI.round((aQ/this.ANNUAL_PERIODS)*(aO/100),2)
}ay=Math.round(KJE.PV(aJ/(this.ANNUAL_PERIODS*100),q,ad));
if(au<0){if(az>0){av=(ar+ay-aA+((this.SALES_TAX_LESS_TRADE?aK:0)+Z)*(aM/100))/(aM/100+1);
au=av;
var an=au/2;
for(var ab=0;
ab<30;
ab++){if(au/(az/100)<(au+aK-aN+ay-aA+((this.SALES_TAX_LESS_TRADE?aK:0)+Z)*(aM/100))/(aM/100+1)){au+=an
}else{au-=an
}an=an/2
}}else{au=0
}}ar=au+aK-aN;
av=(ar+ay)-Z-aA;
ao=0;
if(aM>0){var an=av/2;
for(var ab=0;
ab<30;
ab++){if(av<(ar+ay-Z-aA-ao)){av+=an
}else{av-=an
}an=an/2;
ao=aI.round((av+Z-(this.SALES_TAX_LESS_TRADE?aK:0))*(aM/100),2)
}}}else{if(au<0){if(az>0){au=(az/100)*av
}else{au=0
}}ar=au+aK-aN;
ao=(av-(this.SALES_TAX_LESS_TRADE?aK:0)+Z)*(aM/100);
ay=av+ao+aA+Z-ar;
ad=aI.round(KJE.PMT(aJ/(this.ANNUAL_PERIODS*100),q,ay),2);
aQ=ad*(aO/100)*this.ANNUAL_PERIODS;
if(ad<0){ad=0;
ay=0
}}az=au/av;
if(aQ<=0&&aO>0){aQ=(ad*this.ANNUAL_PERIODS)/(aO/100)
}this.TOTAL_FEES=aA+Z;
this.TOTAL_SALE_PRICE=av+ao+this.TOTAL_FEES;
this.TOTAL_TAXES_AND_FEES=ao+this.TOTAL_FEES;
var aj=500;
if(ay>100000){aj=5000
}else{if(ay>50000){aj=2500
}else{if(ay>20000){aj=1000
}else{if(ay<5000){aj=250
}}}}if(au>0){aB=0-au;
aC=0;
aD=aj;
aE=2*aj
}else{aB=0;
aC=aj;
aD=2*aj;
aE=3*aj
}this.DS_DOWNPAYMENT[0]=this.CHANGE_DOWNPAYMENT_NEWPAYMENT_1=KJE.PMT(aJ/(this.ANNUAL_PERIODS*100),q,ay-aB);
this.DS_DOWNPAYMENT[1]=this.CHANGE_DOWNPAYMENT_NEWPAYMENT_2=KJE.PMT(aJ/(this.ANNUAL_PERIODS*100),q,ay-aC);
this.DS_DOWNPAYMENT[2]=this.CHANGE_DOWNPAYMENT_NEWPAYMENT_3=KJE.PMT(aJ/(this.ANNUAL_PERIODS*100),q,ay-aD);
this.DS_DOWNPAYMENT[3]=this.CHANGE_DOWNPAYMENT_NEWPAYMENT_4=KJE.PMT(aJ/(this.ANNUAL_PERIODS*100),q,ay-aE);
this.CS_DOWNPAYMENT[0]=aI.dollars(au+aB)+" "+this.MSG_DOWNPAYMENT;
this.CS_DOWNPAYMENT[1]=aI.dollars(au+aC)+" "+this.MSG_DOWNPAYMENT;
this.CS_DOWNPAYMENT[2]=aI.dollars(au+aD)+" "+this.MSG_DOWNPAYMENT;
this.CS_DOWNPAYMENT[3]=aI.dollars(au+aE)+" "+this.MSG_DOWNPAYMENT;
var ae=this.ANNUAL_PERIODS;
if(q<this.ANNUAL_PERIODS*3){n=q;
Y=q+ae;
aa=q+2*ae;
ac=q+3*ae
}else{if(q<this.ANNUAL_PERIODS*5){n=q-ae;
Y=q;
aa=q+ae;
ac=q+2*ae
}else{n=q-2*ae;
Y=q-ae;
aa=q;
ac=q+ae
}}this.DS_CHANGE_TERM[0]=this.CHANGE_TERM_NEWPAYMENT_1=KJE.PMT(aJ/(this.ANNUAL_PERIODS*100),n,ay);
this.DS_CHANGE_TERM[1]=this.CHANGE_TERM_NEWPAYMENT_2=KJE.PMT(aJ/(this.ANNUAL_PERIODS*100),Y,ay);
this.DS_CHANGE_TERM[2]=this.CHANGE_TERM_NEWPAYMENT_3=KJE.PMT(aJ/(this.ANNUAL_PERIODS*100),aa,ay);
this.DS_CHANGE_TERM[3]=this.CHANGE_TERM_NEWPAYMENT_4=KJE.PMT(aJ/(this.ANNUAL_PERIODS*100),ac,ay);
this.CS_CHANGE_TERM[0]=aI.number(n)+" "+this.PERIOD_DESC;
this.CS_CHANGE_TERM[1]=aI.number(Y)+" "+this.PERIOD_DESC;
this.CS_CHANGE_TERM[2]=aI.number(aa)+" "+this.PERIOD_DESC;
this.CS_CHANGE_TERM[3]=aI.number(ac)+" "+this.PERIOD_DESC;
var aG=Math.round(q);
var ab=0;
var ah=aG;
this.DS_BALANCE=new Array(ah);
this.cats=new Array(ah);
if(ak){var at=this.sSchedule;
at.clearRepeat();
at.addHeader((this.YEAR?at.sReportCol("Year",5):at.sReportCol(KJE.Default.PAY_DESC[aL],5)),at.sReportCol("Payment",1),at.sReportCol("Principal",2),at.sReportCol("Interest",3),at.sReportCol("Balance",4));
at.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",aI.dollars(ay))
}var i=ay;
var aw=0;
var aF=0;
var am=ad;
var ai=0;
var ap=0;
var ax=0;
var af=0;
var al=true;
this.INTEREST_PAID=0;
for(var ag=1;
ag<=aG;
ag++){ab=ag-1;
aw=aI.round((aJ/(this.ANNUAL_PERIODS*100))*i,2);
aF=ad-aw;
i-=aF;
this.INTEREST_PAID+=aw;
if(i<0||ag==aG){am+=i;
i=0;
aF=am-aw
}else{am=ad
}this.cats[ab]=""+ag;
this.DS_BALANCE[ab]=i;
if(ak&&!this.YEAR){at.addRepeat(aI.number(ag),aI.dollars(am),aI.dollars(aF),aI.dollars(aw),aI.dollars(i))
}ap+=am;
ax+=aF;
af+=aw;
if(ak&&this.YEAR&&ag%this.ANNUAL_PERIODS==0){at.addRepeat(aI.number(ag/this.ANNUAL_PERIODS),aI.dollars(ap),aI.dollars(ax),aI.dollars(af),aI.dollars(i));
ap=0;
ax=0;
af=0
}}this.MSG_AUTO_TITLE=KJE.getKJEReplaced((this.PAYMENT_CALC?this.MSG_TITLE_PAYMENT:this.MSG_TITLE_AMOUNT),aI.dollars(ad),(KJE.lang=="FR"?this.PERIOD_LABEL:this.PERIOD_PAY_PER),aI.dollars(av));
this.MONTHLY_PAYMENT=ad;
this.AUTO_SALE_PRICE=av;
this.TOTAL_OF_PAYMENTS=this.INTEREST_PAID+ay;
this.ANNUAL_INCOME=aQ;
this.PERCENT_DOWN=az;
this.TOTAL_DOWN=ar;
this.QUALIFYING_INCOME_LOW=aP;
this.QUALIFYING_INCOME_HIGH=aq;
this.SALES_TAX=ao;
this.LOAN_AMOUNT=ay;
this.CALC_PAYMENT_AMOUNT=aH;
this.CHANGE_DOWNPAYMENT_1=aB;
this.CHANGE_DOWNPAYMENT_2=aC;
this.CHANGE_DOWNPAYMENT_3=aD;
this.CHANGE_DOWNPAYMENT_4=aE;
this.CHANGE_TERM_1=n;
this.CHANGE_TERM_2=Y;
this.CHANGE_TERM_3=aa;
this.CHANGE_TERM_4=ac
};
KJE.AutoLoanCalc.prototype.formatReport=function(b){b.dollars("CALC_PAYMENT_AMOUNT",this.CALC_PAYMENT_AMOUNT);
b.replace("CHANGE_DOWNPAYMENT_1",this.CS_DOWNPAYMENT[0]);
b.replace("CHANGE_DOWNPAYMENT_2",this.CS_DOWNPAYMENT[1]);
b.replace("CHANGE_DOWNPAYMENT_3",this.CS_DOWNPAYMENT[2]);
b.replace("CHANGE_DOWNPAYMENT_4",this.CS_DOWNPAYMENT[3]);
b.dollars("CHANGE_DOWNPAYMENT_NEWPAYMENT_1",this.CHANGE_DOWNPAYMENT_NEWPAYMENT_1);
b.dollars("CHANGE_DOWNPAYMENT_NEWPAYMENT_2",this.CHANGE_DOWNPAYMENT_NEWPAYMENT_2);
b.dollars("CHANGE_DOWNPAYMENT_NEWPAYMENT_3",this.CHANGE_DOWNPAYMENT_NEWPAYMENT_3);
b.dollars("CHANGE_DOWNPAYMENT_NEWPAYMENT_4",this.CHANGE_DOWNPAYMENT_NEWPAYMENT_4);
b.number("CHANGE_TERM_1",this.CHANGE_TERM_1);
b.number("CHANGE_TERM_2",this.CHANGE_TERM_2);
b.number("CHANGE_TERM_3",this.CHANGE_TERM_3);
b.number("CHANGE_TERM_4",this.CHANGE_TERM_4);
b.dollars("CHANGE_TERM_NEWPAYMENT_1",this.CHANGE_TERM_NEWPAYMENT_1);
b.dollars("CHANGE_TERM_NEWPAYMENT_2",this.CHANGE_TERM_NEWPAYMENT_2);
b.dollars("CHANGE_TERM_NEWPAYMENT_3",this.CHANGE_TERM_NEWPAYMENT_3);
b.dollars("CHANGE_TERM_NEWPAYMENT_4",this.CHANGE_TERM_NEWPAYMENT_4);
b.dollars("MONTHLY_PAYMENT",this.MONTHLY_PAYMENT);
b.loanRate("INTEREST_RATE",this.INTEREST_RATE/100);
b.number("TERM",this.TERM);
b.percent("PERCENT_DOWN",this.PERCENT_DOWN,1);
b.dollars("CASH_DOWN",this.CASH_DOWN);
if(this.CASH_DOWN>0){b.replace("PAYMENT_INDICATOR1","");
b.replace("PAYMENT_INDICATOR2","<strong>*</strong>")
}else{b.replace("PAYMENT_INDICATOR1","<strong>*</strong>");
b.replace("PAYMENT_INDICATOR2","")
}b.replace("MSG_CHECK_TAX_LESS_TRADE",(this.SALES_TAX_LESS_TRADE?this.MSG_TAX_LESS_TRADE:this.MSG_TAX_NO_TRADE));
b.dollars("TRADE_ALLOWANCE",this.TRADE_ALLOWANCE);
b.dollars("AMOUNT_OWED_ON_TRADE",this.AMOUNT_OWED_ON_TRADE);
b.dollars("NONTAX_FEES",this.NONTAX_FEES);
b.dollars("TAXABLE_FEES",this.TAXABLE_FEES);
b.dollars("TITLE_TRANSFER_FEE",this.NONTAX_FEES);
b.dollars("TOTAL_FEES",this.TOTAL_FEES);
b.taxRate("SALES_TAX_RATE",this.SALES_TAX_RATE/100);
b.dollars("AUTO_SALE_PRICE",this.AUTO_SALE_PRICE);
b.dollars("TOTAL_DOWN",this.TOTAL_DOWN);
b.dollars("NET_TRADE_IN",this.NET_TRADE_IN);
b.dollars("QUALIFYING_INCOME_LOW",this.QUALIFYING_INCOME_LOW);
b.dollars("QUALIFYING_INCOME_HIGH",this.QUALIFYING_INCOME_HIGH);
b.dollars("TOTAL_SALE_PRICE",this.TOTAL_SALE_PRICE);
b.dollars("AUTO_SALE_PRICE",this.AUTO_SALE_PRICE);
b.dollars("SALES_TAX",this.SALES_TAX);
b.dollars("LOAN_AMOUNT",this.LOAN_AMOUNT);
b.dollars("ANNUAL_INCOME",this.ANNUAL_INCOME);
b.percent("DEBT_LOAD_PERCENT",this.DEBT_LOAD_PERCENT/100);
b.dollars("TOTAL_OF_PAYMENTS",this.TOTAL_OF_PAYMENTS);
b.dollars("INTEREST_PAID",this.INTEREST_PAID);
b.replace("PERIOD_PAY_PER",this.PERIOD_PAY_PER.toLowerCase());
b.replace("PERIOD_LABEL_LOWER",this.PERIOD_LABEL.toLowerCase());
b.replace("PERIOD_LABEL",this.PERIOD_LABEL);
b.replace("PERIOD_DESC_LOWER",this.PERIOD_DESC.toLowerCase());
b.replace("PERIOD_DESC",this.PERIOD_DESC);
b.replace("MSG_AUTO_TITLE",this.MSG_AUTO_TITLE);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.Default.PAY_WEEKLY=0;
KJE.Default.PAY_BIWEEKLY=1;
KJE.Default.PAY_MONTHLY=2;
KJE.Default.PAY_SELECTIONS=KJE.parameters.get("ARRAY_PAY_SELECTIONS",["Weekly","Biweekly","Monthly"]);
KJE.Default.PAY_PER=KJE.parameters.get("PAY_DESC",["per week","bi-weekly","per month"]);
KJE.Default.PAY_DESC=KJE.parameters.get("PAY_DESC",["Weeks","Bi-weekly Payments","Months"]);
KJE.Default.PAY_PERIOD=KJE.parameters.get("PAY_PERIOD",[52,26,12]);
KJE.Default.PAY_INDEX=[KJE.Default.PAY_WEEKLY,KJE.Default.PAY_BIWEEKLY,KJE.Default.PAY_MONTHLY];
KJE.getDropBoxPaymentFreq=function(e,f,d){return KJE.replace("**"+e+"**",KJE.getDropBox(e,KJE.parameters.get(e,f),KJE.Default.PAY_INDEX,KJE.Default.PAY_SELECTIONS),d)
};
KJE.CalcName="Car Loan Calculator";
KJE.CalcType="autoloan";
KJE.CalculatorTitleTemplate="KJE1";
KJE.parseInputs=function(b){return KJE.getDropBoxPaymentFreq("PAYMENT_TYPE",KJE.Default.PAY_MONTHLY,b)
};
KJE.initialize=function(){KJE.CalcControl=new KJE.AutoLoanCalc();
KJE.GuiControl=new KJE.AutoLoan(KJE.CalcControl)
};
KJE.AutoLoan=function(s){var A=KJE;
var E=KJE.gLegend;
var z=KJE.inputs.items;
this.SHOW_SIMPLE=KJE.parameters.get("SHOW_SIMPLE",false);
this.SHOW_PAYMENT_PERIODS=KJE.parameters.get("SHOW_PAYMENT_PERIODS",false);
this.SHOW_FEES=KJE.parameters.get("SHOW_FEES",true);
this.TRADEIN_TAX_OPTION_SHOW=KJE.parameters.get("TRADEIN_TAX_OPTION_SHOW",true);
this.MSG_GRAPH_TITLE1=KJE.parameters.get("MSG_GRAPH_TITLE1","Principal Balances for KJE1 in financing");
this.MSG_GRAPH_TITLE2=KJE.parameters.get("MSG_GRAPH_TITLE2","How does the term affect my payment?");
this.MSG_GRAPH_TITLE3=KJE.parameters.get("MSG_GRAPH_TITLE3","How does the down payment affect my payment?");
KJE.Radioboxes("PAYMENT_CALC","Calculate for",true,"Payment","Price","bold");
KJE.DollarSlider("MONTHLY_PAYMENT",(this.SHOW_PAYMENT_PERIODS?"Payment":"Monthly payment"),0,100000,2,0,6);
KJE.PercentSlider("INTEREST_RATE","Interest rate",0,25,2,0.5);
KJE.Slider("TERM",(this.SHOW_PAYMENT_PERIODS?"Number of payments":"Term in months"),12,480,0,A.FMT_NUMBER,6,KJE.parameters.get("TERM_SCALE_LABEL",KJE.s_label[8]),KJE.parameters.get("TERM_SCALE",KJE.useScale(8)));
KJE.DollarSlider("CASH_DOWN","Rebates and Cash Down",0,100000,2,0,1);
KJE.DollarSlider("TRADE_ALLOWANCE","Trade allowance",0,100000,2,0,1);
KJE.DollarSlider("AMOUNT_OWED_ON_TRADE","Amount owed on trade",0,100000,2,0,1);
KJE.DollarSlider("NONTAX_FEES","Fees (non-taxable)",0,10000,2,0,7);
KJE.DollarSlider("TAXABLE_FEES","Fees (taxable)",0,10000,2,0,7);
KJE.PercentSlider("SALES_TAX_RATE","Sales tax rate",0,20,2,0.5);
KJE.DollarSlider("AUTO_SALE_PRICE","Total purchase price (before tax)",0,5000000,2,0,KJE.parameters.get("AUTO_SALE_PRICE_SLM",2));
KJE.Checkbox("SALES_TAX_LESS_TRADE","No Sales tax deduction",false,"Check here if your state does not allow a sales tax deduction for trade-ins");
if(!KJE.parameters.exists("PAYMENT_TYPE")){KJE.parameters.set("PAYMENT_TYPE",KJE.Default.PAY_MONTHLY)
}KJE.DropBox("PAYMENT_TYPE","Payments are made");
this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Principal balance by payment");
if(!this.SHOW_SIMPLE){var y=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],this.MSG_GRAPH_TITLE1);
y._legend.setVisible(false);
y._showItemLabel=false;
y._axisX._fSpacingPercent=0.75;
y._titleYAxis.setText(KJE.sCurrency);
var v=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH2",true,true,KJE.colorList[1],this.MSG_GRAPH_TITLE2);
v._legend.setVisible(true);
v._legend._iOrientation=E.TOP_RIGHT;
v._axisX.setVisible(false);
v._showItemLabel=true;
v._axisX._fSpacingPercent=0.25;
v._axisY._bAutoMinimum=false;
v._titleYAxis.setText(KJE.sCurrency);
v._titleXAxis.setText(KJE.parameters.get("MSG_GRAPH1_XAXIS_TITLE","Payments by Term of Loan"));
v._bPopDetail=true;
var w=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH3",true,true,KJE.colorList[1],this.MSG_GRAPH_TITLE3);
w._legend.setVisible(true);
w._legend._iOrientation=E.TOP_RIGHT;
w._showItemLabel=true;
w._axisX._fSpacingPercent=0.25;
w._axisY._bAutoMinimum=false;
w._axisX.setVisible(false);
w._titleYAxis.setText(KJE.sCurrency);
w._titleXAxis.setText(KJE.parameters.get("MSG_GRAPH2_XAXIS_TITLE","Payments by Down Payment Amount"));
w._bPopDetail=true
}if(this.SHOW_SIMPLE){KJE.addDiv("INPUTS",KJE.colorList[0])
}else{if(KJE.DropperDefined("INPUTS")){var F=KJE.parameters.get("MSG_DROPPER_TITLE","Car financing:");
var C=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Loan amount: KJE1");
var B=function(){return F+"|"+KJE.subText(KJE.getKJEReplaced(C,A.dollars(s.LOAN_AMOUNT)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,B,B),KJE.colorList[0])
}if(KJE.DropperDefined("DOWNPAYMENT")){var D=KJE.parameters.get("MSG_DROPPER_DOWNPAYMENT","Down payment:");
var x=KJE.parameters.get("MSG_DROPPER_CLOSEDOWNPAYMENT","KJE1");
var t=function(){return D+"|"+KJE.subText(KJE.getKJEReplaced(x,A.dollars(s.TOTAL_DOWN)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("DOWNPAYMENT",false,t,t),KJE.colorList[0])
}if(KJE.DropperDefined("TAXES")){var r=KJE.parameters.get("MSG_DROPPER_TAXES","Taxes and fees:");
var l=KJE.parameters.get("MSG_DROPPER_CLOSETAXES","KJE1");
var u=function(){return r+"|"+KJE.subText(KJE.getKJEReplaced(l,A.dollars(s.TOTAL_TAXES_AND_FEES)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("TAXES",false,u,u),KJE.colorList[0])
}}};
KJE.AutoLoan.prototype.setValues=function(c){var d=KJE.inputs.items;
c.PAYMENT_CALC=d.PAYMENT_CALC.getValue();
c.INTEREST_RATE=d.INTEREST_RATE.getValue();
c.TERM=d.TERM.getValue();
c.PAYMENT_TYPE=d.PAYMENT_TYPE.getValue();
c.CASH_DOWN=d.CASH_DOWN.getValue();
c.TRADE_ALLOWANCE=d.TRADE_ALLOWANCE.getValue();
c.AMOUNT_OWED_ON_TRADE=d.AMOUNT_OWED_ON_TRADE.getValue();
c.NONTAX_FEES=d.NONTAX_FEES.getValue();
c.TAXABLE_FEES=d.TAXABLE_FEES.getValue();
c.SALES_TAX_RATE=d.SALES_TAX_RATE.getValue();
c.SALES_TAX_LESS_TRADE=!d.SALES_TAX_LESS_TRADE.getValue();
if(c.PAYMENT_CALC){c.AUTO_SALE_PRICE=d.AUTO_SALE_PRICE.getValue();
c.MONTHLY_PAYMENT=0;
d.MONTHLY_PAYMENT.disable();
d.AUTO_SALE_PRICE.enable()
}else{c.MONTHLY_PAYMENT=d.MONTHLY_PAYMENT.getValue();
c.AUTO_SALE_PRICE=0;
d.MONTHLY_PAYMENT.enable();
d.AUTO_SALE_PRICE.disable()
}};
KJE.AutoLoan.prototype.refresh=function(j){var k=KJE;
var l=KJE.gLegend;
var h=KJE.inputs.items;
var i=KJE.gGraphs[0];
var m=KJE.gGraphs[1];
var n=KJE.gGraphs[2];
KJE.setTitleTemplate(j.MSG_AUTO_TITLE);
if(!this.SHOW_SIMPLE){i.removeAll();
i.setGraphCategories(j.cats);
i.add(new KJE.gGraphDataSeries(j.DS_BALANCE,this.MSG_GRAPH1,i.getColor(1)));
i.setTitleTemplate(k.dollars(j.LOAN_AMOUNT));
i.paint();
m.removeAll();
m.setGraphCategories(j.CS_CHANGE_TERM);
m.add(new KJE.gGraphDataSeries(j.DS_CHANGE_TERM,KJE.MSG_MONTHS,i.getColor(4)));
m._axisY._axisMinimum=(j.DS_CHANGE_TERM[3]*0.66);
m.paint();
n.removeAll();
n.setGraphCategories(j.CS_DOWNPAYMENT);
n.add(new KJE.gGraphDataSeries(j.DS_DOWNPAYMENT,i.getColor(3)));
n._axisY._axisMinimum=(j.DS_DOWNPAYMENT[3]*0.66);
n.paint()
}h.MONTHLY_PAYMENT.setValue(j.MONTHLY_PAYMENT,true);
h.AUTO_SALE_PRICE.setValue(j.AUTO_SALE_PRICE,true)
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-PAYMENT_CALC'><fieldset id='KJE-FS-PAYMENT_CALC'><input type=radio id='KJE-PAYMENT_CALC1' name=PAYMENT_CALC /><input type=radio id='KJE-PAYMENT_CALC2' name=PAYMENT_CALC /></fieldset></div> <div id='KJE-C-AUTO_SALE_PRICE'><input id='KJE-AUTO_SALE_PRICE' /></div> <div id='KJE-C-MONTHLY_PAYMENT'><input id='KJE-MONTHLY_PAYMENT' /></div> <div id='KJE-C-PAYMENT_TYPE'>**PAYMENT_TYPE**</div> <div id='KJE-C-TERM'><input id='KJE-TERM' /></div> <div id='KJE-C-INTEREST_RATE'><input id='KJE-INTEREST_RATE' /></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-DOWNPAYMENT><div id=KJE-P-DOWNPAYMENT>Input information:</div></div> <div id=KJE-E-DOWNPAYMENT > <div id='KJE-C-CASH_DOWN'><input id='KJE-CASH_DOWN' /></div> <div id='KJE-C-TRADE_ALLOWANCE'><input id='KJE-TRADE_ALLOWANCE' /></div> <div id='KJE-C-AMOUNT_OWED_ON_TRADE'><input id='KJE-AMOUNT_OWED_ON_TRADE' /></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-TAXES><div id=KJE-P-TAXES>Input information:</div></div> <div id=KJE-E-TAXES > <div id='KJE-C-NONTAX_FEES'><input id='KJE-NONTAX_FEES' /></div> <div id='KJE-C-TAXABLE_FEES'><input id='KJE-TAXABLE_FEES' /></div> <div id='KJE-C-SALES_TAX_RATE'><input id='KJE-SALES_TAX_RATE' /></div> <div id='KJE-C-SALES_TAX_LESS_TRADE'><input id='KJE-SALES_TAX_LESS_TRADE' type=checkbox name='SALES_TAX_LESS_TRADE' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** **GRAPH2** **GRAPH3** ";
KJE.DefinitionText=" <div id='KJE-D-PAYMENT_CALC' ><dt>Calculate for</dt><dd>Choose what you would like to calculate. You can choose to calculate the payment or the purchase price.</dd></div> <div id='KJE-D-MONTHLY_PAYMENT' ><dt>Monthly payment</dt><dd>The amount you pay each month for your auto financing.</dd></div> <div id='KJE-D-AUTO_SALE_PRICE' ><dt>Total purchase price (before tax)</dt><dd>This is the total cost of your auto purchase. Include the cost of the vehicle, additional options and destination charges. This amount does not include sales tax. Sales tax will be calculated for you and included in your total after-tax price.</dd></div> <div id='KJE-D-TERM' ><dt>Term in months</dt><dd>Number of months the loan will be in effect.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Interest rate</dt><dd>Annual interest rate for this loan.</dd></div> <div id='KJE-D-CASH_DOWN' ><dt>Rebates and cash down</dt><dd>Total amount of cash and/or factory rebates applied to the purchase. The larger your cash down payment the smaller the loan you will need to finance this purchase.</dd></div> <div id='KJE-D-TRADE_ALLOWANCE' ><dt>Trade allowance</dt><dd>The total amount that you are given for any automobile that you trade-in as part of the purchase. In some states a trade-in can also reduce the amount of sales tax you will owe. See the definition for \"No sales tax deduction for trade-in\" for more information on trade-in vehicles and sales tax.</dd></div> <div id='KJE-D-AMOUNT_OWED_ON_TRADE' ><dt>Amount owed on trade</dt><dd>Total loan balance still outstanding on the trade-in.</dd></div> <div id='KJE-D-NONTAX_FEES' ><dt>Non-taxable fees (optional)</dt><dd>Any additional fee that is not subject to sales tax. This usually includes document fees or any other fees that may be due at delivery and are not taxable.</dd></div> <div id='KJE-D-TAXABLE_FEES' ><dt>Taxable fees (optional)</dt><dd>Any additional fee that is subject to sales tax. This usually includes title transfer fees or any other fees that may be due at delivery and are taxable.</dd></div> <div id='KJE-D-SALES_TAX_RATE' ><dt>Sales tax rate</dt><dd>Sales tax percentage rate charged on this purchase.</dd></div> <div id='KJE-D-SALES_TAX_LESS_TRADE' ><dt>No sales tax deduction for trade-in</dt><dd>If you live in a state where your sales tax is calculated on your full purchase price, check this box in the calculator. If this box is unchecked, sales tax is calculated on the purchase price, less trade-in. Currently the District of Columbia, California, Hawaii, Maryland, Kentucky, Michigan and Virginia allow no deductions for trade-ins when calculating sales tax. In addition, Alaska, Delaware, Montana and New Hampshire have no sales tax on auto purchases. Oregon currently only collects tax on new vehicles.</dd></div> ";
KJE.ReportText=' <h2 class=\'KJEReportHeader KJEFontHeading\'>Your car payment is MONTHLY_PAYMENT PERIOD_PAY_PER for a AUTO_SALE_PRICE car.</h2>This is for LOAN_AMOUNT in financing at INTEREST_RATE for TERM months. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable role="presentation" > <caption class=\'KJEHeaderRow KJEHeading\'>Car Financing Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Interest rate:</th><td class="KJECell">INTEREST_RATE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Term in months:</th><td class="KJECell">TERM</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total purchase price (before tax):</th><td class="KJECell">AUTO_SALE_PRICE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Taxable fees:</th><td class="KJECell">TAXABLE_FEES</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Sales tax*:</th><td class="KJECell">SALES_TAX</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Non-taxable fees:</th><td class="KJECell">NONTAX_FEES</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total sales price (after-tax):</th><td class="KJECell">TOTAL_SALE_PRICE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total down payment**:</th><td class="KJECell">TOTAL_DOWN</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Amount financed:</th><td class="KJECellStrong">LOAN_AMOUNT</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Monthly payment:</th><td class="KJECellStrong">MONTHLY_PAYMENT</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total payments***:</th><td class="KJECellStrong">TOTAL_OF_PAYMENTS</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest paid***:</th><td class="KJECellStrong">INTEREST_PAID</td></tr> </tfoot> </table> </div> <div class=KJEInset> *MSG_CHECK_TAX_LESS_TRADE Currently California, the District of Columbia, Hawaii and Michigan allow no deductions for trade-ins when calculating sales tax. If you live in one of these states make sure to check the box "No sales tax deduction for trade-in" on the main calculator page. <p>**Your total down payment is calculated as your rebates and cash down payment of CASH_DOWN plus your trade-in allowance of TRADE_ALLOWANCE minus the AMOUNT_OWED_ON_TRADE balance outstanding on your trade-in vehicle. <p>***This assumes that you do not refinance and that all payments are made on time with no prepayments. </div> **GRAPH** **GRAPH** <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment Schedule</h2> **REPEATING GROUP** ';
KJE.parameters.set("AMOUNT_OWED_ON_TRADE",4000);
KJE.parameters.set("AUTO_SALE_PRICE",20000);
KJE.parameters.set("CASH_DOWN",1500);
KJE.parameters.set("INTEREST_RATE",KJE.Default.RateAuto);
KJE.parameters.set("MONTHLY_PAYMENT",300);
KJE.parameters.set("NONTAX_FEES",40);
KJE.parameters.set("SALES_TAX_RATE",6);
KJE.parameters.set("TAXABLE_FEES",0);
KJE.parameters.set("TERM",84);
KJE.parameters.set("TRADE_ALLOWANCE",5000);
KJE.parameters.set("PAYMENT_TYPE_HIDE",true);
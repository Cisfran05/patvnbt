KJE.MortgageQualifierCalc=function(){this.CALCULATE_BY=KJE.MortgageQualifierCalc.PURCHASE_PRICE;
this.MONTHS=0;
this.SHOW_PAYMENT_BY_YEAR=true;
this.bShowTotalInterest=true;
this.OTHER_CLOSING_COSTS_RATE=0;
this.LOAN_ORIGINATION_AMT=0;
this.dEquitySum=0;
this.dInterestSum=0;
this.TAX_AMOUNT=0;
this.PMI_PERCENT=KJE.parameters.get("PMI_PERCENT",0.2);
this.USE_LOAN_ORIGINATION_AMOUNT=KJE.parameters.get("USE_LOAN_ORIGINATION_AMOUNT",false);
this.USE_PROPERTY_TAX_AMOUNT=KJE.parameters.get("USE_PROPERTY_TAX_AMOUNT",false);
this.USE_CLOSING_COSTS_AMOUNT=KJE.parameters.get("USE_OTHER_FEES_AMOUNT",true);
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Total closing costs exceed cash on hand.");
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2_START","Total debt payments exceeds KJE1 of your income.");
this.bTERMINMONTHS=KJE.parameters.get("TERM_IN_MONTHS",false);
this.bSHOW_LOAN_ORIGINATION_RATE=KJE.parameters.get("SHOW_LOAN_ORIGINATION_RATE",true);
this.HIGH_DEBT_PITI_RATE=KJE.parameters.get("HIGH_DEBT_PITI_RATE",0.36);
this.LOW_DEBT_PITI_RATE=KJE.parameters.get("LOW_DEBT_PITI_RATE",0.28);
this.PMI_RATE=KJE.parameters.get("PMI_RATE",0.5);
this.MSG_DOWNPAYMENT=KJE.parameters.get("MSG_DOWNPAYMENT","Down payment");
this.MSG_REMAINING_CASH=KJE.parameters.get("MSG_REMAINING_CASH","Remaining cash");
this.MSG_LOAN_ORIGINATION_RATE=KJE.parameters.get("MSG_LOAN_ORIGINATION_RATE","Loan origination");
this.MSG_POINTS_PAID_NBR=KJE.parameters.get("MSG_POINTS_PAID_NBR","Points paid");
this.MSG_OTHER_CLOSING_COSTS=KJE.parameters.get("MSG_OTHER_CLOSING_COSTS","Other closing costs");
this.MSG_HOME_INSURANCE_RATE=KJE.parameters.get("MSG_HOME_INSURANCE_RATE","Home insurance");
this.MSG_PMI_RATE=KJE.parameters.get("MSG_PMI_RATE","PMI");
this.MSG_PROPERTY_TAX_RATE=KJE.parameters.get("MSG_PROPERTY_TAX_RATE","Property taxes");
this.MSG_LABEL8=KJE.parameters.get("MSG_LABEL8","Principal and interest");
this.DS_PRIN_BALANCE=null;
this.DS_INTEREST_PAID=null;
this.DS_EQUITY=null;
this.DS_INTEREST=null;
this.cats=null;
this.sCatPayment=new Array(4);
this.fCatPayment=KJE.FloatArray(4);
this.sCatClosing=new Array(this.bSHOW_LOAN_ORIGINATION_RATE?5:4);
this.fCatClosing=KJE.FloatArray(this.bSHOW_LOAN_ORIGINATION_RATE?5:4);
this.sSchedule=new KJE.Repeating()
};
KJE.MortgageQualifierCalc.prototype.clear=function(){this.ANNUAL_INCOME=0;
this.MONTHLY_CAR_PAYMENTS=0;
this.CREDIT_CARD_PAYMENTS=0;
this.OTHER_LOAN_PAYMENTS=0;
this.DOWNPAYMENT_CLOSING_CASH=0;
this.PROPERTY_TAX_RATE=0;
this.HOME_INSURANCE_RATE=0;
this.LOAN_ORIGINATION_RATE=0;
this.INTEREST_RATE=0;
this.LENGTH_OF_LOAN=0;
this.POINTS_PAID_NBR=0;
this.OTHER_CLOSING_COSTS=0;
this.MAXIMUM_20_DOWN=false;
this.TOTAL_MONTHLY_PAYMENT=0;
this.PURCHASE_PRICE=0
};
KJE.MortgageQualifierCalc.prototype.calculate=function(aj){var aP=KJE;
var ac=this.MONTHLY_CAR_PAYMENTS;
var aH=this.CREDIT_CARD_PAYMENTS;
var aS=this.OTHER_LOAN_PAYMENTS;
var ay=this.DOWNPAYMENT_CLOSING_CASH;
var ad=this.PROPERTY_TAX_RATE;
var au=this.HOME_INSURANCE_RATE;
var aw=this.LOAN_ORIGINATION_RATE;
var aQ=this.INTEREST_RATE;
var am=this.LENGTH_OF_LOAN;
var aG=this.POINTS_PAID_NBR;
var aJ=this.OTHER_CLOSING_COSTS;
var ax=this.MAXIMUM_20_DOWN;
var aA=this.PURCHASE_PRICE;
var ab=0;
var al=0;
var aR=0;
var i=0;
var ao=0;
var ak=0;
var at=0;
var aC=0;
var p=0;
this.MONTHS=0;
if(this.bTERMINMONTHS){this.MONTHS=am%12;
am=Math.floor(am/12)
}var aB=false;
var aL=p*100;
var aD=this.TOTAL_MONTHLY_PAYMENT;
var az=aA;
var aE=p*200;
var ai=0;
var aM=0;
var aO=0;
if(this.CALCULATE_BY==KJE.MortgageQualifierCalc.QLFY_SELECT_ANNUAL_INCOME){aA=0;
this.TOTAL_MONTHLY_PAYMENT=0
}else{if(this.CALCULATE_BY==KJE.MortgageQualifierCalc.QLFY_SELECT_MONTHLY_PAYMENT){aM=(this.TOTAL_MONTHLY_PAYMENT/this.LOW_DEBT_PITI_RATE)*12;
aO=((this.TOTAL_MONTHLY_PAYMENT+ac+aH+aS)/this.HIGH_DEBT_PITI_RATE)*12;
if(aM>aO){this.ANNUAL_INCOME=Math.round(aM)
}else{this.ANNUAL_INCOME=Math.round(aO)
}}else{aB=false;
aL=aA/2;
aE=aA;
var ag=2;
ai=0;
var ae=0;
while(aB==false){if(this.USE_LOAN_ORIGINATION_AMOUNT){aw=(this.LOAN_ORIGINATION_AMT/aE)*100
}else{this.LOAN_ORIGINATION_AMT=aE*(aw/100)
}if(this.USE_CLOSING_COSTS_AMOUNT){}else{aJ=aP.round(aE*(this.OTHER_CLOSING_COSTS_RATE/100),2)
}aR=aE*(aG/100);
aC=aA*this.PMI_PERCENT;
ak=aR+this.LOAN_ORIGINATION_AMT+aJ;
at=ay-ak;
if((at>aC)&&ax){at=aC
}if(aC>at){ao=aE*(this.PMI_RATE/1200)
}else{ao=0
}ae=aE+at;
if(Math.round(aA)==Math.round(ae)){aB=true
}else{if(aA>ae){aE+=aL
}else{aE-=aL
}}aE=aP.round(aE,0);
aL=(aL/2);
ai++;
if(ai>50){aB=true
}}i=aP.round(KJE.PMT(aQ/1200,am*12+this.MONTHS,aE),2);
if(this.USE_PROPERTY_TAX_AMOUNT){ab=this.TAX_AMOUNT
}else{ab=aA*(ad/100)
}al=aA*(au/100);
this.TOTAL_MONTHLY_PAYMENT=al/12+ab/12+i+ao;
aM=(this.TOTAL_MONTHLY_PAYMENT/(this.LOW_DEBT_PITI_RATE))*12;
aO=((this.TOTAL_MONTHLY_PAYMENT+ac+aH+aS)/this.HIGH_DEBT_PITI_RATE)*12;
if(aM>aO){this.ANNUAL_INCOME=aP.round(aM)
}else{this.ANNUAL_INCOME=aP.round(aO)
}}}var aT=(this.ANNUAL_INCOME/12)*this.LOW_DEBT_PITI_RATE;
var af=((this.ANNUAL_INCOME/12)*this.HIGH_DEBT_PITI_RATE)-(ac+aH+aS);
if(af<0){throw (KJE.replace("KJE1",aP.percent(this.HIGH_DEBT_PITI_RATE),this.MSG_ERROR2))
}if(aT<af){p=aT
}else{p=af
}aB=false;
aL=p*100;
if(this.CALCULATE_BY!=KJE.MortgageQualifierCalc.QLFY_SELECT_PURCHASE_PRICE){aE=p*200
}ai=0;
while(aB==false){if(this.USE_LOAN_ORIGINATION_AMOUNT){aw=(this.LOAN_ORIGINATION_AMT/aE)*100
}else{this.LOAN_ORIGINATION_AMT=aE*(aw/100)
}if(this.USE_CLOSING_COSTS_AMOUNT){}else{aJ=aP.round(aE*(this.OTHER_CLOSING_COSTS_RATE/100),2)
}aR=aE*(aG/100);
aC=aA*this.PMI_PERCENT;
ak=aR+this.LOAN_ORIGINATION_AMT+aJ;
at=ay-ak;
if((at>aC)&&(ax==1)){at=aC
}if(aC>at){ao=aE*(this.PMI_RATE/1200)
}else{ao=0
}i=aP.round(KJE.PMT(aQ/1200,am*12+this.MONTHS,aE),2);
aA=aE+at;
if(this.USE_PROPERTY_TAX_AMOUNT){ab=this.TAX_AMOUNT
}else{ab=aA*(ad/100)
}al=aA*(au/100);
this.TOTAL_MONTHLY_PAYMENT=al/12+ab/12+i+ao;
if(Math.round(this.TOTAL_MONTHLY_PAYMENT)==Math.round(p)){aB=true
}else{if(p>this.TOTAL_MONTHLY_PAYMENT){aE+=aL
}else{aE-=aL
}}aL=(aL/2);
ai++;
if(ai>50){aB=true
}}aE=aP.round(aE,2);
i=aP.round(KJE.PMT(aQ/1200,am*12+this.MONTHS,aE),2);
if(this.CALCULATE_BY==KJE.MortgageQualifierCalc.QLFY_SELECT_MONTHLY_PAYMENT){this.TOTAL_MONTHLY_PAYMENT=aD
}else{if(this.CALCULATE_BY==KJE.MortgageQualifierCalc.QLFY_SELECT_PURCHASE_PRICE){aA=az
}}var aU=ak+aC;
var aN=aP.round(am);
this.DS_PRIN_BALANCE=KJE.FloatArray(aN);
this.DS_INTEREST_PAID=KJE.FloatArray(aN);
this.DS_EQUITY=KJE.FloatArray(aN);
this.DS_INTEREST=KJE.FloatArray(aN);
aE=aP.round(aE,0);
this.cats=new Array(aN);
if(aj){var av=this.sSchedule;
var aF="";
if(this.SHOW_PAYMENT_BY_YEAR){aF=av.sReportCol("Year",2)
}else{aF=av.sReportCol("Month",1)
}av.clearRepeat();
av.addHeader(aF,av.sReportCol("Payments",3),av.sReportCol("Interest",4),av.sReportCol("Principal",5),av.sReportCol("Balance",6),(this.bShowTotalInterest?av.sReportCol("Total Interest",7):null));
av.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",aP.dollars(aE,2),(this.bShowTotalInterest?"&nbsp;":null))
}var aa=0;
var an=aE;
var aq=0;
var aK=aQ/1200;
var aI=0;
var ap=0;
var ar=0;
var n=0;
this.dEquitySum=0;
this.dInterestSum=0;
for(ag=1;
ag<=aN*12+this.MONTHS;
ag++){aI=aP.round(an*aK,2);
ap=i-aI;
an-=ap;
if(an<0){ap+=an;
an=0
}else{if(ag==aN*12+this.MONTHS){ap+=an;
an=0
}}aq+=aI;
ar+=ap;
n+=aI;
this.dEquitySum+=ap;
this.dInterestSum+=aI;
if(this.SHOW_PAYMENT_BY_YEAR==0){if(aj){av.addRepeat(aP.number(ag),aP.dollars(aI+ap,2),aP.dollars(aI,2),aP.dollars(ap,2),aP.dollars(an,2),(this.bShowTotalInterest?aP.dollars(aq,2):null))
}}if((ag%12)==0){this.DS_PRIN_BALANCE[aa]=an;
this.DS_INTEREST_PAID[aa]=aq;
this.DS_EQUITY[aa]=ar;
this.DS_INTEREST[aa]=n;
this.cats[aa]=""+(aa+1);
if(aj&&(this.SHOW_PAYMENT_BY_YEAR==1)){av.addRepeat(aP.number(aa+1),aP.dollars(n+ar,2),aP.dollars(n,2),aP.dollars(ar,2),aP.dollars(an,2),(this.bShowTotalInterest?aP.dollars(aq,2):null))
}ar=0;
n=0;
aa++
}}this.REMAINING_CASH=ay-ak-at;
this.PURCHASE_PRICE=aA;
this.LOAN_AMOUNT=aE;
this.PROPERY_TAX_AMT=ab;
this.HOME_INSURANCE_AMT=al;
this.POINTS_PAID_AMT=aR;
this.MONTHLY_PI=i;
this.MONTHLY_PMI=ao;
this.TOTAL_CLOSING_COSTS=ak;
this.TOTAL_FOR_DOWNPAYMENT=at;
this.PERCENT_20_DOWN_AMT=aC;
this.CLOSING_COSTS_PLUS_20=aU;
this.QLFY_PITI_ONLY=aT;
this.QLFY_PITI_DEBT=af;
this.QLFY_AMOUNT=p;
this.LENGTH_OF_LOAN=am;
ag=0;
this.fCatPayment[ag]=this.MONTHLY_PI;
this.sCatPayment[ag++]=this.MSG_LABEL8+" "+aP.dollars(this.MONTHLY_PI,2);
this.fCatPayment[ag]=this.MONTHLY_INSURANCE=aP.round(this.HOME_INSURANCE_AMT/12,2);
this.sCatPayment[ag++]=this.MSG_HOME_INSURANCE_RATE+" "+aP.dollars(this.HOME_INSURANCE_AMT/12,2);
this.fCatPayment[ag]=this.MONTHLY_PMI;
this.sCatPayment[ag++]=this.MSG_PMI_RATE+" "+aP.dollars(this.MONTHLY_PMI,2);
this.fCatPayment[ag]=this.MONTHLY_TAXES=aP.round(this.PROPERY_TAX_AMT/12,2);
this.sCatPayment[ag++]=this.MSG_PROPERTY_TAX_RATE+" "+aP.dollars(this.PROPERY_TAX_AMT/12,2);
var ah=0;
this.fCatClosing[ah]=(this.TOTAL_FOR_DOWNPAYMENT);
this.sCatClosing[ah++]=this.MSG_DOWNPAYMENT+" "+aP.dollars(this.TOTAL_FOR_DOWNPAYMENT);
if(this.bSHOW_LOAN_ORIGINATION_RATE){this.fCatClosing[ah]=(this.LOAN_ORIGINATION_AMT);
this.sCatClosing[ah++]=this.MSG_LOAN_ORIGINATION_RATE+" "+aP.dollars(this.LOAN_ORIGINATION_AMT)
}this.fCatClosing[ah]=this.POINTS_PAID_AMT;
this.sCatClosing[ah++]=this.MSG_POINTS_PAID_NBR+" "+aP.dollars(this.POINTS_PAID_AMT);
this.fCatClosing[ah]=this.OTHER_CLOSING_COSTS;
this.sCatClosing[ah++]=this.MSG_OTHER_CLOSING_COSTS+" "+aP.dollars(this.OTHER_CLOSING_COSTS);
this.fCatClosing[ah]=this.DOWNPAYMENT_CLOSING_CASH-this.TOTAL_CLOSING_COSTS-this.TOTAL_FOR_DOWNPAYMENT;
this.sCatClosing[ah]=this.MSG_REMAINING_CASH+" "+aP.dollars(this.REMAINING_CASH);
this.TOTAL_LOAN_PAYMENTS=this.CREDIT_CARD_PAYMENTS+this.MONTHLY_CAR_PAYMENTS+this.OTHER_LOAN_PAYMENTS
};
KJE.MortgageQualifierCalc.prototype.formatReport=function(b){b.dollars("TOTAL_CLOSING_COSTS_DP",this.TOTAL_CLOSING_COSTS+this.TOTAL_FOR_DOWNPAYMENT);
b.dollars("ANNUAL_INCOME",this.ANNUAL_INCOME);
b.dollars("MONTHLY_CAR_PAYMENTS",this.MONTHLY_CAR_PAYMENTS);
b.dollars("CREDIT_CARD_PAYMENTS",this.CREDIT_CARD_PAYMENTS);
b.dollars("OTHER_LOAN_PAYMENTS",this.OTHER_LOAN_PAYMENTS);
b.dollars("TOTAL_LOAN_PAYMENTS",this.TOTAL_LOAN_PAYMENTS);
b.dollars("MONTHLY_INCOME",this.ANNUAL_INCOME/12);
b.dollars("DOWNPAYMENT_CLOSING_CASH",this.DOWNPAYMENT_CLOSING_CASH);
b.taxRate("PROPERTY_TAX_RATE",this.PROPERTY_TAX_RATE/100);
b.percent("HOME_INSURANCE_RATE",this.HOME_INSURANCE_RATE/100,2);
b.percent("LOAN_ORIGINATION_RATE",this.LOAN_ORIGINATION_RATE/100,2);
b.loanRate("INTEREST_RATE",this.INTEREST_RATE/100);
if(this.MONTHS>0){b.number("LENGTH_OF_LOAN",this.LENGTH_OF_LOAN*12+this.MONTHS);
b.replace("years","months");
b.replace("Years","Months");
b.replace("-year","-month")
}else{b.number("LENGTH_OF_LOAN",this.LENGTH_OF_LOAN)
}b.number("POINTS_PAID_NBR",this.POINTS_PAID_NBR,3);
b.percent("PMI_RATE",this.PMI_RATE/100,2);
b.dollars("OTHER_CLOSING_COSTS",this.OTHER_CLOSING_COSTS);
b.dollars("LOAN_AMOUNT",this.LOAN_AMOUNT);
b.dollars("PROPERY_TAX_AMT",this.PROPERY_TAX_AMT);
b.dollars("HOME_INSURANCE_AMT",this.HOME_INSURANCE_AMT);
b.dollars("MONTHLY_TAXES",this.MONTHLY_TAXES);
b.dollars("MONTHLY_INSURANCE",this.MONTHLY_INSURANCE);
b.dollars("LOAN_ORIGINATION_AMT",this.LOAN_ORIGINATION_AMT);
b.dollars("POINTS_PAID_AMT",this.POINTS_PAID_AMT);
b.dollars("MONTHLY_PI",this.MONTHLY_PI);
b.dollars("MONTHLY_PMI",this.MONTHLY_PMI);
b.dollars("TOTAL_CLOSING_COSTS",this.TOTAL_CLOSING_COSTS);
b.dollars("TOTAL_FOR_DOWNPAYMENT",this.TOTAL_FOR_DOWNPAYMENT);
b.dollars("PURCHASE_PRICE",this.PURCHASE_PRICE);
b.dollars("PERCENT_20_DOWN_AMT",this.PERCENT_20_DOWN_AMT);
b.dollars("CLOSING_COSTS_PLUS_20",this.CLOSING_COSTS_PLUS_20);
b.dollars("TOTAL_MONTHLY_PAYMENT",this.TOTAL_MONTHLY_PAYMENT);
b.yesno("MAXIMUM_20_DOWN",this.MAXIMUM_20_DOWN);
b.yesno("SHOW_PAYMENT_BY_MONTH",!this.SHOW_PAYMENT_BY_YEAR);
b.percent("HIGH_DEBT_PITI_RATE",this.HIGH_DEBT_PITI_RATE);
b.yesno("SHOW_PAYMENT_BY_YEAR",this.SHOW_PAYMENT_BY_YEAR);
b.percent("LOW_DEBT_PITI_RATE",this.LOW_DEBT_PITI_RATE);
b.dollars("QLFY_PITI_ONLY",this.QLFY_PITI_ONLY);
b.dollars("QLFY_PITI_DEBT",this.QLFY_PITI_DEBT);
b.dollars("QLFY_AMOUNT",this.QLFY_AMOUNT);
b.percent("PMI_PERCENT",this.PMI_PERCENT);
b.dollars("REMAINING_CASH",this.REMAINING_CASH);
b.dollars("INTEREST_PAID",this.dInterestSum);
b.dollars("TOTAL_OF_PAYMENTS",this.dEquitySum+this.dInterestSum);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.MortgageQualifierCalc.QLFY_SELECTIONS=KJE.parameters.get("ARRAY_QLFY_SELECTIONS",["Annual income","Purchase price","Total monthly payment"]);
KJE.MortgageQualifierCalc.QLFY_INDEXES=[0,1,2];
KJE.MortgageQualifierCalc.QLFY_SELECT_ANNUAL_INCOME=0;
KJE.MortgageQualifierCalc.QLFY_SELECT_PURCHASE_PRICE=1;
KJE.MortgageQualifierCalc.QLFY_SELECT_MONTHLY_PAYMENT=2;
KJE.CalcName="Mortgage Qualifier Calculator";
KJE.CalcType="mortgagequalifier";
KJE.CalculatorTitleTemplate="You can purchase a KJE1 home";
KJE.parseInputs=function(c){c=KJE.replace("**TERM**",KJE.getMortgageTermDrop("TERM",30),c);
var d=KJE.getDropBox("CALCULATE_BY",KJE.parameters.get("CALCULATE_BY",1),KJE.MortgageQualifierCalc.QLFY_INDEXES,KJE.MortgageQualifierCalc.QLFY_SELECTIONS);
c=KJE.replace("**CALCULATE_BY**",d,c);
return c
};
KJE.initialize=function(){KJE.CalcControl=new KJE.MortgageQualifierCalc();
KJE.GuiControl=new KJE.MortgageQualifier(KJE.CalcControl)
};
KJE.MortgageQualifier=function(l){var w=KJE;
var A=KJE.gLegend;
var v=KJE.inputs.items;
this.MSG_GRAPH5=KJE.parameters.get("MSG_GRAPH5","Principal balance");
this.MSG_GRAPH6=KJE.parameters.get("MSG_GRAPH6","Interest paid to date");
this.MSG_GRAPH8=KJE.parameters.get("MSG_GRAPH8","Interest");
this.MSG_GRAPH9=KJE.parameters.get("MSG_GRAPH9","Principal");
KJE.Slider("ANNUAL_INCOME","Annual income",0,100000000,0,KJE.FMT_DOLLARS,0,KJE.s_label[3],KJE.useScale(3));
KJE.Slider("TOTAL_MONTHLY_PAYMENT","Total monthly payment",0,1000000,0,KJE.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));
KJE.MortgageAmtSlider("PURCHASE_PRICE","Purchase price");
KJE.DollarSlider("MONTHLY_CAR_PAYMENTS","Monthly car payment(s)",0,10000);
KJE.DollarSlider("CREDIT_CARD_PAYMENTS","Credit card payment(s)",0,10000);
KJE.DollarSlider("OTHER_LOAN_PAYMENTS","Other loan payment(s)",0,10000);
KJE.DollarSlider("DOWNPAYMENT_CLOSING_CASH","Cash on hand",0,10000000);
KJE.PercentSlider("PROPERTY_TAX_RATE","Property tax",0,20,2);
KJE.PercentSlider("HOME_INSURANCE_RATE","Home insurance",0,10,2);
KJE.Label("LOAN_AMOUNT","Loan amount",null,null,"bold");
if(l.USE_LOAN_ORIGINATION_AMOUNT){KJE.DollarSlider("LOAN_ORIGINATION_RATE","Loan origination",0,100000)
}else{KJE.PercentSlider("LOAN_ORIGINATION_RATE","Loan origination",0,5,2)
}KJE.MortgageRateSlider("INTEREST_RATE","Interest rate");
KJE.NumberSlider("POINTS_PAID_NBR","Points paid",-4,8,3,0.5);
if(l.USE_CLOSING_COSTS_AMOUNT){KJE.DollarSlider("OTHER_CLOSING_COSTS","Other closing costs",0,10000)
}else{KJE.PercentSlider("OTHER_CLOSING_COSTS","Other closing costs",0,5,2)
}KJE.Checkbox("MAXIMUM_20_DOWN",KJE.getKJEReplaced(KJE.parameters.get("MSG_LABEL3","Limit downpayment to KJE1"),w.percent(l.PMI_PERCENT)));
KJE.NumberSlider("TERM_MONTHS","Term in months",KJE.parameters.get("TERM_MONTHS_MIN",0),KJE.parameters.get("TERM_MONTHS_MAX",480));
KJE.MortgageTermDropBoxSlider("TERM","Term in years");
if(l.bTERMINMONTHS){v.TERM.hide()
}else{v.TERM_MONTHS.hide()
}KJE.DropBox("CALCULATE_BY","Calculate for",null,null,"bold");
KJE.Radioboxes("BY_YEAR","Report amortization",true,"Annually","Monthly");
var r=KJE.gNewGraph(KJE.gPIE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH10","KJE1 Monthly Payment Breakdown"));
r._legend._iOrientation=(A.TOP_RIGHT);
r._titleXAxis.setText(KJE.parameters.get("MSG_GRAPH7","Year of Loan"));
var u=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH3",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPHTITLE","Use of KJE1 Cash on Hand"));
u._legend._iOrientation=(A.TOP_RIGHT);
u._titleYAxis.setText(KJE.sCurrency);
u._titleXAxis.setText(KJE.parameters.get("MSG_AXIS_TITLE","Down Payment and Closing Costs"));
u._axisX.setVisible(false);
var t=KJE.gNewGraph(KJE.gLINE,"GRAPH2",true,true,KJE.colorList[1],KJE.parameters.get("MSG_TOTAL_PAYMENTS","Total Payments: ")+this.MSG_GRAPH8+" KJE1, "+this.MSG_GRAPH9+" KJE2");
t._legend._iOrientation=(KJE.gLegend.TOP_RIGHT);
t._titleYAxis.setText(KJE.sCurrency);
t._titleXAxis.setText(KJE.MSG_YEAR_LBL);
if(this.bSHOW_LOAN_ORIGINATION_RATE){v.LOAN_ORIGINATION_RATE.hide();
v.LOAN_ORIGINATION_RATE.setValue(0,true)
}var B=KJE.parameters.get("MSG_DROPPER_TITLE","Mortgage Information:");
var y=KJE.parameters.get("MSG_DROPPER_CLOSETITLE"," Annual income of KJE1 qualifies for KJE2 per month");
var x=function(){return B+KJE.subText(KJE.getKJEReplaced(y,v.ANNUAL_INCOME.getFormatted(),v.TOTAL_MONTHLY_PAYMENT.getFormatted()),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,B,x),KJE.colorList[0]);
var p=KJE.parameters.get("MSG_DROPPER_DEBT","Total Monthly Debt Payments:");
var q=function(){return p+"|"+KJE.subText(w.dollars(l.TOTAL_LOAN_PAYMENTS),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("DEBT",false,q,q),KJE.colorList[0]);
var z=KJE.parameters.get("MSG_DROPPER_DOWNPAYMENT","Down Payment and Closing Costs:");
var s=function(){return z+"|"+KJE.subText(w.dollars(l.TOTAL_CLOSING_COSTS),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("DOWNPAYMENT",false,s,s),KJE.colorList[0])
};
KJE.MortgageQualifier.prototype.setValues=function(c){var d=KJE.inputs.items;
c.CALCULATE_BY=d.CALCULATE_BY.getValue();
if(c.CALCULATE_BY==KJE.MortgageQualifierCalc.QLFY_SELECT_ANNUAL_INCOME){d.ANNUAL_INCOME.enable();
d.TOTAL_MONTHLY_PAYMENT.disable();
d.PURCHASE_PRICE.disable();
c.ANNUAL_INCOME=d.ANNUAL_INCOME.getValue()
}else{if(c.CALCULATE_BY==KJE.MortgageQualifierCalc.QLFY_SELECT_MONTHLY_PAYMENT){d.ANNUAL_INCOME.disable();
d.TOTAL_MONTHLY_PAYMENT.enable();
d.PURCHASE_PRICE.disable();
c.TOTAL_MONTHLY_PAYMENT=d.TOTAL_MONTHLY_PAYMENT.getValue()
}else{d.ANNUAL_INCOME.disable();
d.TOTAL_MONTHLY_PAYMENT.disable();
d.PURCHASE_PRICE.enable();
c.PURCHASE_PRICE=d.PURCHASE_PRICE.getValue()
}}c.MONTHLY_CAR_PAYMENTS=d.MONTHLY_CAR_PAYMENTS.getValue();
c.CREDIT_CARD_PAYMENTS=d.CREDIT_CARD_PAYMENTS.getValue();
c.OTHER_LOAN_PAYMENTS=d.OTHER_LOAN_PAYMENTS.getValue();
c.DOWNPAYMENT_CLOSING_CASH=d.DOWNPAYMENT_CLOSING_CASH.getValue();
c.PROPERTY_TAX_RATE=d.PROPERTY_TAX_RATE.getValue();
c.HOME_INSURANCE_RATE=d.HOME_INSURANCE_RATE.getValue();
if(c.USE_LOAN_ORIGINATION_AMOUNT){c.LOAN_ORIGINATION_AMT=d.LOAN_ORIGINATION_RATE.getValue()
}else{c.LOAN_ORIGINATION_RATE=d.LOAN_ORIGINATION_RATE.getValue()
}if(c.USE_CLOSING_COSTS_AMOUNT){c.OTHER_CLOSING_COSTS=d.OTHER_CLOSING_COSTS.getValue()
}else{c.OTHER_CLOSING_COSTS_RATE=d.OTHER_CLOSING_COSTS.getValue()
}c.INTEREST_RATE=d.INTEREST_RATE.getValue();
if(c.bTERMINMONTHS){c.LENGTH_OF_LOAN=d.TERM_MONTHS.getValue()
}else{c.LENGTH_OF_LOAN=d.TERM.getValue()
}c.POINTS_PAID_NBR=d.POINTS_PAID_NBR.getValue();
c.MAXIMUM_20_DOWN=d.MAXIMUM_20_DOWN.getValue();
c.SHOW_PAYMENT_BY_YEAR=d.BY_YEAR.getValue()
};
KJE.MortgageQualifier.prototype.refresh=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
KJE.setTitleTemplate(i.dollars(h.PURCHASE_PRICE));
var g=KJE.gGraphs[2];
g.removeAll();
g.setTitleTemplate(i.dollars(h.dInterestSum),i.dollars(h.dEquitySum));
g.setGraphCategories(h.cats);
g.add(new KJE.gGraphDataSeries(h.DS_PRIN_BALANCE,this.MSG_GRAPH5,g.getColor(1)));
g.add(new KJE.gGraphDataSeries(h.DS_INTEREST_PAID,this.MSG_GRAPH6,g.getColor(2)));
g.paint();
g=KJE.gGraphs[0];
g.removeAll();
g.setTitleTemplate(i.dollars(h.TOTAL_MONTHLY_PAYMENT),KJE.getTermLabel(h.TERM));
g.setGraphCategories(h.sCatPayment);
g.add(new KJE.gGraphDataSeries(h.fCatPayment,"",g.getColor(1)));
g.paint();
g=KJE.gGraphs[1];
g.removeAll();
g.setTitleTemplate(i.dollars(h.DOWNPAYMENT_CLOSING_CASH));
g.setGraphCategories(h.sCatClosing);
g.add(new KJE.gGraphDataSeries(h.fCatClosing,"",g.getColor(1)));
g._axisY._bAutoMinimum=false;
g._axisY._axisMinimum=(h.TOTAL_FOR_DOWNPAYMENT<0?(h.TOTAL_FOR_DOWNPAYMENT):0);
g._axisY._axisMinimum=(h.POINTS_PAID_AMT<g._axisY._axisMinimum?(h.POINTS_PAID_AMT):0);
g.paint();
f.LOAN_AMOUNT.setText(i.dollars(h.LOAN_AMOUNT),true);
f.TOTAL_MONTHLY_PAYMENT.setValue(h.TOTAL_MONTHLY_PAYMENT,true);
f.ANNUAL_INCOME.setValue(h.ANNUAL_INCOME,true);
f.PURCHASE_PRICE.setValue(h.PURCHASE_PRICE,true)
};
KJE.parameters.set("CALCULATE_BY",0);
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-CALCULATE_BY'>**CALCULATE_BY**</div> <div id='KJE-C-ANNUAL_INCOME'><input id='KJE-ANNUAL_INCOME' /></div> <div id='KJE-C-PURCHASE_PRICE'><input id='KJE-PURCHASE_PRICE' /></div> <div id='KJE-C-TOTAL_MONTHLY_PAYMENT'><input id='KJE-TOTAL_MONTHLY_PAYMENT' /></div> <div class=KJEDropperSpacer></div> <div id='KJE-C-LOAN_AMOUNT'><div id='KJE-LOAN_AMOUNT'></div></div> <div id=\"KJE-C-TERM\">**TERM**</div> <div id=\"KJE-C-TERM_MONTHS\"><input id='KJE-TERM_MONTHS' /></div> <div id='KJE-C-INTEREST_RATE'><input id='KJE-INTEREST_RATE' /></div> <div id='KJE-C-PROPERTY_TAX_RATE'><input id='KJE-PROPERTY_TAX_RATE' /></div> <div id='KJE-C-HOME_INSURANCE_RATE'><input id='KJE-HOME_INSURANCE_RATE' /></div> <div id=\"KJE-C-BY_YEAR\"><fieldset id='KJE-FS-BY_YEAR'><input id=\"KJE-BY_YEAR1\" type=radio name=BY_YEAR /><input id=\"KJE-BY_YEAR2\" type=radio name=BY_YEAR /></fieldset></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-DOWNPAYMENT><div id=KJE-P-DOWNPAYMENT>Downpayment and closing costs</div></div> <div id=KJE-E-DOWNPAYMENT > <div id='KJE-C-DOWNPAYMENT_CLOSING_CASH'><input id='KJE-DOWNPAYMENT_CLOSING_CASH' /></div> <div id='KJE-C-LOAN_ORIGINATION_RATE'><input id='KJE-LOAN_ORIGINATION_RATE' /></div> <div id='KJE-C-POINTS_PAID_NBR'><input id='KJE-POINTS_PAID_NBR' /></div> <div id='KJE-C-OTHER_CLOSING_COSTS'><input id='KJE-OTHER_CLOSING_COSTS' /></div> <div id='KJE-C-MAXIMUM_20_DOWN'><input id='KJE-MAXIMUM_20_DOWN' type=checkbox /></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-DEBT><div id=KJE-P-DEBT>Prepayment information</div></div> <div id=KJE-E-DEBT > <div id='KJE-C-MONTHLY_CAR_PAYMENTS'><input id='KJE-MONTHLY_CAR_PAYMENTS' /></div> <div id='KJE-C-CREDIT_CARD_PAYMENTS'><input id='KJE-CREDIT_CARD_PAYMENTS' /></div> <div id='KJE-C-OTHER_LOAN_PAYMENTS'><input id='KJE-OTHER_LOAN_PAYMENTS' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** **GRAPH2** **GRAPH3** ";
KJE.DefinitionText=" <div id='KJE-D-ANNUAL_INCOME' ><dt>Annual income</dt><dd>Your annual income before taxes. For joint applicants this is your total combined annual income before taxes.</dd></div> <div id='KJE-D-PURCHASE_PRICE' ><dt>Purchase price</dt><dd>The price of the home you wish to purchase. This is the actual price you'll pay, not including any closing costs.</dd></div> <div id='KJE-D-TOTAL_MONTHLY_PAYMENT' ><dt>Total monthly payment</dt><dd>Your total monthly payment, including principal, interest, taxes and insurance (often called \"PITI\").</dd></div> <div id='KJE-D-TERM' ><dt>Term in years</dt><dd>The number of years over which you will repay this loan. Common mortgage terms are 15, 20 and 30 years.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Interest rate</dt><dd>The current interest rate you expect to receive on your mortgage. Please note that the interest rate is different from the Annual Percentage Rate (APR), which includes other expenses such as mortgage insurance, and the origination fee and or point(s), which were paid when the mortgage was first originated. The APR is normally higher than the simple interest rate.</dd></div> <div id='KJE-D-PROPERTY_TAX_RATE' ><dt>Property tax rate</dt><dd>Your property tax rate. 1% for a $100,000 home equals $1,000 per year in property taxes.</dd></div> <div id='KJE-D-HOME_INSURANCE_RATE' ><dt>Home insurance rate</dt><dd>Your home owner's insurance rate. 0.5% for a $100,000 home equals $500 per year for homeowner's insurance.</dd></div> <div id=\"KJE-D-BY_YEAR\" ><dt>Report amortization</dt><dd>Choose how the report will display your payment schedule. Annually will summarize payments and balances by year. Monthly will show every payment for the entire term.</div> <div id='KJE-D-DOWNPAYMENT_CLOSING_CASH' ><dt>Cash on hand</dt><dd>Cash you have for the down payment and all closing costs.</dd></div> <div id='KJE-D-LOAN_ORIGINATION_RATE' ><dt>Loan origination rate</dt><dd>The percentage the lending institution charges for its origination fee. 1% for a $100,000 home equals $1,000.</dd></div> <div id='KJE-D-POINTS_PAID_NBR' ><dt>Number of points paid</dt><dd>The total number of points paid to reduce the interest rate of your mortgage. Each point costs 1% of your mortgage balance.</dd></div> <div id='KJE-D-OTHER_CLOSING_COSTS' ><dt>Other closing costs</dt><dd>Estimate of all other closing costs for this loan. This should include filing fees, appraiser fees and any other miscellaneous fees paid.</dd></div> <div id='KJE-D-MAXIMUM_20_DOWN' ><dt>Limit down payment</dt><dd>Limit your down payment to percentage required to eliminate the need for PMI payments. Even if you have more cash on hand than required for closing costs, checking this box will limit your down payment to the minimum amount required to forego PMI.</dd></div> <div id='KJE-D-MONTHLY_CAR_PAYMENTS' ><dt>Monthly car payment(s)</dt><dd>Total monthly payment for your car loan(s).</dd></div> <div id='KJE-D-CREDIT_CARD_PAYMENTS' ><dt>Credit card payments</dt><dd>Total monthly minimum payments for your credit cards.</dd></div> <div id='KJE-D-OTHER_LOAN_PAYMENTS' ><dt>Other loan payments</dt><dd>Any other installment loan payments, such as student loans or unsecured loans.</dd></div> <div ><dt>Total closing costs</dt><dd>Total upfront costs to close your loan. This is the total of your loan origination fee, points paid and other closing costs.</dd></div> <div ><dt>Monthly PMI payment</dt><dd>Monthly cost of Principal Mortgage Insurance (PMI). For loans secured with less than 20% down, PMI is estimated at 0.5% of your loan balance each year. Monthly PMI is calculated by multiplying your starting loan balance by this percent and dividing by 12. When the equity in your home exceeds the percentage required for PMI, your PMI payment drops to zero. Please note that this is only an estimate of your actual PMI. The amount you may be required to pay may be higher or lower than our estimate.</dd></div> <div ><dt>Monthly PI payment</dt><dd>Monthly principal and interest payment.</dd></div> <div ><dt>Total for down payment</dt><dd>Total funds remaining, after closing costs, for down payment.</dd></div> <div ><dt>Total annual income debt percentage</dt><dd>Not shown. This is the percentage of your annual income your financial institution allows you to use for debt installment payments. This includes car payments, credit card payments, other loan payments and your principal, interest, taxes and insurance payment for your home. The default rate is 36%.</dd></div> <div ><dt>PITI annual income percentage</dt><dd>Not shown. This is the percentage of your annual income your financial institution allows you to use for your principal, interest, taxes and insurance payment for your home. The default rate is 28%.</dd></div> ";
KJE.ReportText=" <h2 class='KJEReportHeader KJEFontHeading'>With an annual income of ANNUAL_INCOME, you may be able to afford a LOAN_AMOUNT loan.</h2> Using your input values, an annual income of ANNUAL_INCOME should enable you to carry a LENGTH_OF_LOAN-year mortgage at INTEREST_RATE in the amount of LOAN_AMOUNT. With a TOTAL_FOR_DOWNPAYMENT down payment, the total purchase price would be PURCHASE_PRICE. Total closing costs for this loan are estimated at TOTAL_CLOSING_COSTS. **GRAPH** <div class=KJECenter><div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Monthly Payment TOTAL_MONTHLY_PAYMENT (PI<!--STARTHIDETAXES-->TI<!--ENDHIDETAXES-->)</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Principal and interest</th><td class=\"KJECell KJECell30\">MONTHLY_PI</td></tr> <!--STARTHIDETAXES--> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>PMI</th><td class=\"KJECell\">MONTHLY_PMI</td></tr> <!--ENDHIDETAXES--> <!--STARTHIDETAXES--><tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Taxes</th><td class=\"KJECell\">MONTHLY_TAXES</td></tr> <!--ENDHIDETAXES--> <!--STARTHIDETAXES--><tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Insurance</th><td class=\"KJECell\">MONTHLY_INSURANCE</td></tr><!--ENDHIDETAXES--> </tbody> </table></div></div> <!--STARTHIDETAXES--> <p>To avoid PMI payments a PERCENT_20_DOWN_AMT down payment is required. This equals PMI_PERCENT of your home's purchase price. The total amount of cash required for a PMI_PERCENT down payment plus closing costs would be CLOSING_COSTS_PLUS_20. <p><!--ENDHIDETAXES--> <h2 class='KJEReportHeader KJEFontHeading'>Qualify Calculation</h2> <p>Your monthly payment of QLFY_AMOUNT is calculated by taking the lower of these two calculations: <ol> <li>Monthly Income X LOW_DEBT_PITI_RATE = monthly PI<!--STARTHIDETAXES-->TI<!--ENDHIDETAXES--><br />MONTHLY_INCOME X LOW_DEBT_PITI_RATE = QLFY_PITI_ONLY<p></p></li> <li>Monthly Income X HIGH_DEBT_PITI_RATE - Other debt payments = monthly PI<!--STARTHIDETAXES-->TI<!--ENDHIDETAXES--><br />MONTHLY_INCOME X HIGH_DEBT_PITI_RATE - TOTAL_LOAN_PAYMENTS = QLFY_PITI_DEBT</li> </ol> <div class=KJECenter><div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Mortgage Summary</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Loan amount</th><td class=\"KJECell KJECell30\">LOAN_AMOUNT</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Annual income</th><td class=KJECell>ANNUAL_INCOME</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Purchase price</th><td class=KJECell>PURCHASE_PRICE</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Monthly payment (PI)</th><td class=KJECell>MONTHLY_PI</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Term</th><td class=KJECell>LENGTH_OF_LOAN years</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Interest rate</th><td class=KJECell>INTEREST_RATE</td></tr> </tbody> </table></div></div> <div class=KJECenter> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Monthly Debt Payments</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Monthly car payment(s)</th><td class=\"KJECell KJECell30\">MONTHLY_CAR_PAYMENTS</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Credit card payment(s)</th><td class=KJECell>CREDIT_CARD_PAYMENTS</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Other loan payments</th><td class=KJECell>OTHER_LOAN_PAYMENTS</td></tr> </tbody> <tfoot class='KJEReportTFooter'> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total monthly debt payments</th><td class=KJECell>TOTAL_LOAN_PAYMENTS</td></tr> </tfoot> </TABLE></div> </div> <h2 class='KJEReportHeader KJEFontHeading'>Closing Costs</h2> **GRAPH** <div class=KJECenter><div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Down Payment and Closing Costs</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Cash on hand</th><td class=\"KJECell KJECellStrong\">DOWNPAYMENT_CLOSING_CASH</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Down payment</th><td class=KJECell>TOTAL_FOR_DOWNPAYMENT</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Loan origination fee</th><td class=\"KJECell\">LOAN_ORIGINATION_AMT</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Fee for points paid</th><td class=\"KJECell\">POINTS_PAID_AMT</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Other closing costs</th><td class=\"KJECell\">OTHER_CLOSING_COSTS</td></tr> </tbody> <tfoot class='KJEReportTFooter'> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Total closing costs</th><td class=\"KJECell KJECellStrong KJECell30\">TOTAL_CLOSING_COSTS_DP</td></tr> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Remaining cash</th><td class=\"KJECell KJECellStrong\">REMAINING_CASH</td></tr> </tfoot> </table></div></div> <h2 class='KJEReportHeader KJEFontHeading'>Total Payments</h2> **GRAPH** <div class=KJECenter><div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Total Principal and Interest Payments</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Total principal and interest payments</th><td class=KJECellStrong>TOTAL_OF_PAYMENTS</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total interest</th><td class=KJECellStrong>INTEREST_PAID</td></tr> </tbody> </table></div></div> <h2 class='KJEScheduleHeader KJEFontHeading'>Payment Schedule</h2> **REPEATING GROUP** ";
KJE.parameters.set("TOTAL_MONTHLY_PAYMENT",500);
KJE.parameters.set("PURCHASE_PRICE",10000);
KJE.parameters.set("ANNUAL_INCOME",100000);
KJE.parameters.set("CREDIT_CARD_PAYMENTS",0);
KJE.parameters.set("DOWNPAYMENT_CLOSING_CASH",10000);
KJE.parameters.set("HOME_INSURANCE_RATE",0.5);
KJE.parameters.set("INTEREST_RATE",KJE.Default.RateFix30);
KJE.parameters.set("TERM",30);
KJE.parameters.set("TERM",30);
KJE.parameters.set("LENGTH_OF_LOAN",30);
KJE.parameters.set("LOAN_ORIGINATION_RATE",1);
KJE.parameters.set("MAXIMUM_20_DOWN",0);
KJE.parameters.set("MONTHLY_CAR_PAYMENTS",0);
KJE.parameters.set("OTHER_CLOSING_COSTS",0);
KJE.parameters.set("OTHER_LOAN_PAYMENTS",0);
KJE.parameters.set("POINTS_PAID_NBR",0);
KJE.parameters.set("PROPERTY_TAX_RATE",1);
KJE.parameters.set("BY_YEAR",true);
KJE.parameters.set("PMI_PERCENT",0.2);
KJE.parameters.set("PMI_RATE",0.5);
KJE.parameters.set("HIGH_DEBT_PITI_RATE",0.36);
KJE.parameters.set("LOW_DEBT_PITI_RATE",0.28);
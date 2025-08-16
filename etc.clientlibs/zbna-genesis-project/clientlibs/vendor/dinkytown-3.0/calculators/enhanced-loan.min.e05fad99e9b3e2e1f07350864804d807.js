KJE.EnhancedLoanCalc=function(){this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Payment must be greater than zero.");
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Balance must be greater than zero.");
this.MSG_ERROR3=KJE.parameters.get("MSG_ERROR3","Term must be greater than zero.");
this.MSG_ERROR4=KJE.parameters.get("MSG_ERROR4","Rate must at least zero.");
this.MSG_ERROR5=KJE.parameters.get("MSG_ERROR5","Calculated loan balance is less than zero.");
this.MSG_ERROR6=KJE.parameters.get("MSG_ERROR6","Calculated term is zero.");
this.MSG_ERROR7=KJE.parameters.get("MSG_ERROR7","Calculated loan term exceeds 360 months.");
this.MSG_ERROR8=KJE.parameters.get("MSG_ERROR8","Calculated loan balance exceeds MSG_AMOUNT_LIMIT.");
this.MSG_ERROR9=KJE.parameters.get("MSG_ERROR9","Calculated interest rate is less than zero.");
this.MSG_ERROR10=KJE.parameters.get("MSG_ERROR10","Calculated interest rate exceeds MSG_AMOUNT_LIMIT.");
this.MSG_ERROR11=KJE.parameters.get("MSG_ERROR11","Calculated loan payment exceeds MSG_AMOUNT_LIMIT.");
this.INPUT_YEARS=KJE.parameters.get("INPUT_YEARS",false);
this.CALCULATE_THIS=KJE.EnhancedLoanCalc.CALC_AMOUNT;
this.BY_YEAR=false;
this.LOAN_AMOUNT=0;
this.LOAN_RATE=0;
this.MONTHLY_PAYMENT=0;
this.TERM=0;
this.TOTAL_INTEREST=0;
this.PAYOFF="";
this.sSchedule=new KJE.Repeating()
};
KJE.EnhancedLoanCalc.prototype.clear=function(){};
KJE.EnhancedLoanCalc.prototype.calculate=function(n){var u=KJE;
if(this.INPUT_YEARS){this.TERM=this.TERM*12
}if(this.CALCULATE_THIS==KJE.EnhancedLoanCalc.CALC_AMOUNT){if(this.MONTHLY_PAYMENT<=0){throw (this.MSG_ERROR1)
}if(this.TERM<=0){throw (this.MSG_ERROR3)
}if(this.INTEREST_RATE<0){throw (this.MSG_ERROR4)
}this.LOAN_AMOUNT=u.round(KJE.PV(this.INTEREST_RATE/1200,this.TERM,this.MONTHLY_PAYMENT)-0.5,0);
if(this.LOAN_AMOUNT<=0){throw (this.MSG_ERROR5)
}if(this.LOAN_AMOUNT>=10000000){throw (KJE.replace("MSG_AMOUNT_LIMIT",u.dollars(10000000),this.MSG_ERROR8))
}}else{if(this.CALCULATE_THIS==KJE.EnhancedLoanCalc.CALC_TERM){if(this.MONTHLY_PAYMENT<=0){throw (this.MSG_ERROR1)
}if(this.LOAN_AMOUNT<=0){throw (this.MSG_ERROR2)
}if(this.INTEREST_RATE<0){throw (this.MSG_ERROR4)
}this.TERM=KJE.PERIODS(this.INTEREST_RATE/1200,this.MONTHLY_PAYMENT,this.LOAN_AMOUNT);
if(this.TERM<=0){throw (this.MSG_ERROR6)
}if(this.TERM>=360){throw (this.MSG_ERROR7)
}}else{if(this.CALCULATE_THIS==KJE.EnhancedLoanCalc.CALC_RATE){if(this.LOAN_AMOUNT<=0){throw (this.MSG_ERROR2)
}if(this.TERM<=0){throw (this.MSG_ERROR3)
}if(this.MONTHLY_PAYMENT<=0){throw (this.MSG_ERROR1)
}if((this.MONTHLY_PAYMENT*this.TERM)<this.LOAN_AMOUNT){throw (this.MSG_ERROR9)
}this.INTEREST_RATE=KJE.RATE(this.TERM,this.MONTHLY_PAYMENT,this.LOAN_AMOUNT)*1200;
if(this.INTEREST_RATE>200){throw (KJE.replace("MSG_AMOUNT_LIMIT",u.percent(200),this.MSG_ERROR10))
}}else{if(this.LOAN_AMOUNT<=0){throw (this.MSG_ERROR2)
}if(this.TERM<=0){throw (this.MSG_ERROR3)
}if(this.INTEREST_RATE<0){throw (this.MSG_ERROR4)
}this.MONTHLY_PAYMENT=u.round(KJE.PMT(this.INTEREST_RATE/1200,this.TERM,this.LOAN_AMOUNT),2);
if(this.MONTHLY_PAYMENT>20000){throw (KJE.replace("MSG_AMOUNT_LIMIT",u.dollars(20000),this.MSG_ERROR11))
}}}}var i=Math.round(this.TERM);
var r=0;
this.DR_BALANCE=KJE.FloatArray(i);
this.DR_PRINCIPAL=KJE.FloatArray(i);
this.DR_INTEREST=KJE.FloatArray(i);
this.DR_MONTHLY_PAYMENT=KJE.FloatArray(i);
this.DR_GRAPH_BALANCE=KJE.FloatArray(i);
this.TOTAL_INTEREST=0;
var y=0;
var A=0;
var z=this.LOAN_AMOUNT;
var B=this.MONTHLY_PAYMENT;
var w=0;
for(w=0;
(w<i);
w++){y=u.round(this.INTEREST_RATE/1200*z,2);
A=this.MONTHLY_PAYMENT-y;
z-=A;
if(z<0){B+=z;
z=0;
A=B-y
}else{B=this.MONTHLY_PAYMENT
}if(i-1==w){if(z>0.005||z<0.005){B+=z;
z=0;
A=B-y
}else{z=0
}}if(this.BY_YEAR){var x=Math.floor(w/12);
this.DR_BALANCE[x]=z;
this.DR_INTEREST[x]+=y;
this.DR_PRINCIPAL[x]+=A;
this.DR_MONTHLY_PAYMENT[x]+=y+A
}else{this.DR_BALANCE[w]=z;
this.DR_INTEREST[w]=y;
this.DR_PRINCIPAL[w]=A;
this.DR_MONTHLY_PAYMENT[w]=y+A
}this.TOTAL_INTEREST+=y;
this.DR_GRAPH_BALANCE[w]=z
}this.PAYOFF=KJE.getTermLabel(i,true);
if(n){var s=this.sSchedule;
s.clearRepeat();
s.addHeader((this.BY_YEAR?s.sReportCol("Year",2):s.sReportCol("&nbsp;",1)),s.sReportCol("Payment"+(this.BY_YEAR?"s":"")+"",3),s.sReportCol("Interest",4),s.sReportCol("Principal",5),s.sReportCol("Balance",6));
s.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",u.dollars(this.LOAN_AMOUNT))
}var p=0;
i=(i);
var v=1;
if(i>=120){v=12
}var t=Math.floor(i/v)+1;
this.cats=KJE.FloatArray(t);
this.DS_BALANCE=KJE.FloatArray(t);
this.cats[p]="0";
this.DS_BALANCE[p++]=(this.LOAN_AMOUNT);
for(w=1;
w<=i;
w++){r=w-1;
if(w%v==0){this.cats[p]=""+(i<120?p*v:p);
this.DS_BALANCE[p++]=this.DR_GRAPH_BALANCE[r]
}if(n){if(!this.BY_YEAR){s.addRepeat(w,u.dollars(this.DR_MONTHLY_PAYMENT[r],2),u.dollars(this.DR_INTEREST[r],2),u.dollars(this.DR_PRINCIPAL[r],2),u.dollars(this.DR_BALANCE[r],2))
}}}if(n){if(this.BY_YEAR){for(r=0;
r<=i&&this.DR_MONTHLY_PAYMENT[r]>0;
r++){s.addRepeat((r+1),u.dollars(this.DR_MONTHLY_PAYMENT[r],2),u.dollars(this.DR_INTEREST[r],2),u.dollars(this.DR_PRINCIPAL[r],2),u.dollars(this.DR_BALANCE[r],2))
}}}};
KJE.EnhancedLoanCalc.prototype.formatReport=function(b){b.dollars("LOAN_AMOUNT",this.LOAN_AMOUNT);
b.loanRate("INTEREST_RATE",this.INTEREST_RATE/100);
b.dollars("MONTHLY_PAYMENT",this.MONTHLY_PAYMENT);
b.number("TERM",this.TERM/12,1);
b.number("LOAN_MONTHS",this.TERM);
b.replace("PAYOFF",this.PAYOFF);
b.dollars("TOTAL_INTEREST",this.TOTAL_INTEREST);
b.dollars("TOTAL_OF_PAYMENTS",this.TOTAL_INTEREST+this.LOAN_AMOUNT);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.EnhancedLoanCalc.CALC_AMOUNT=0;
KJE.EnhancedLoanCalc.CALC_RATE=1;
KJE.EnhancedLoanCalc.CALC_TERM=2;
KJE.EnhancedLoanCalc.CALC_PAYMENT=3;
KJE.EnhancedLoanCalc.CALC_INDEX=[KJE.EnhancedLoanCalc.CALC_PAYMENT,KJE.EnhancedLoanCalc.CALC_RATE,KJE.EnhancedLoanCalc.CALC_TERM,KJE.EnhancedLoanCalc.CALC_AMOUNT];
KJE.EnhancedLoanCalc.CALC_DESC=KJE.parameters.get("ARRAY_CALC_DESC",["Monthly Payment","Interest rate","Term","Loan amount"]);
KJE.CalcName="Enhanced Loan Calculator";
KJE.CalcType="EnhancedLoan";
KJE.CalculatorTitleTemplate="Your KJE1 loan has a payment of KJE2";
KJE.parseInputs=function(c){var d=KJE.getDropBox("CALC_INDEX",KJE.parameters.get("CALC_INDEX",KJE.EnhancedLoanCalc.CALC_PAYMENT),KJE.EnhancedLoanCalc.CALC_INDEX,KJE.EnhancedLoanCalc.CALC_DESC);
c=KJE.replace("**CALC_INDEX**",d,c);
return c
};
KJE.initialize=function(){KJE.CalcControl=new KJE.EnhancedLoanCalc();
KJE.GuiControl=new KJE.EnhancedLoan(KJE.CalcControl)
};
KJE.EnhancedLoan=function(k){var l=KJE;
var n=KJE.gLegend;
var i=KJE.inputs.items;
this.tfInput=new Array(4);
this.MSG_GRAPH_TITLE1=KJE.parameters.get("MSG_GRAPH_TITLE1","Loan Balance by Year");
this.MSG_GRAPH_TITLE2=KJE.parameters.get("MSG_GRAPH_TITLE2","Loan Balance by Month");
this.MSG_GRAPH_LBL1=KJE.parameters.get("MSG_GRAPH_LBL1","New balance");
this.tfInput[KJE.EnhancedLoanCalc.CALC_AMOUNT]=KJE.DollarSlider("LOAN_AMOUNT","Loan amount",0,10000000,0,1,2);
this.tfInput[KJE.EnhancedLoanCalc.CALC_RATE]=KJE.PercentSlider("INTEREST_RATE","Interest rate",0,24,3);
if(k.INPUT_YEARS){this.tfInput[KJE.EnhancedLoanCalc.CALC_TERM]=KJE.NumberSlider("TERM","Term in years",1,30,0)
}else{this.tfInput[KJE.EnhancedLoanCalc.CALC_TERM]=KJE.NumberSlider("TERM","Term in months",1,360,0,6)
}this.tfInput[KJE.EnhancedLoanCalc.CALC_PAYMENT]=KJE.DollarSlider("MONTHLY_PAYMENT","Monthly payment",0,100000,2,1,7);
KJE.DropBox("CALC_INDEX","Calculate for",null,null,"bold");
KJE.Radioboxes("YEAR","Report amortization",true,"Annually","Monthly");
var j=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],this.MSG_GRAPH_TITLE2);
j._legend.setVisible(false);
j._iArea=KJE.gGraphLine.AREA_FIRST_ONLY;
j._legend._iOrientation=(n.TOP_RIGHT);
var m=KJE.parameters.get("MSG_DROPPER_TITLE","Enhanced Loan Inputs:");
var o=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Loan amount KJE1, Payment KJE4, Term of KJE3 at KJE2");
var p=function(){return m+KJE.subText(KJE.getKJEReplaced(o,i.LOAN_AMOUNT.getFormatted(),i.INTEREST_RATE.getFormatted(),k.PAYOFF,i.MONTHLY_PAYMENT.getFormatted()),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,m,p),KJE.colorList[0])
};
KJE.EnhancedLoan.prototype.setValues=function(h){var f=KJE.inputs.items;
h.CALCULATE_THIS=f.CALC_INDEX.getValue();
h.LOAN_AMOUNT=f.LOAN_AMOUNT.getValue();
h.INTEREST_RATE=f.INTEREST_RATE.getValue();
h.MONTHLY_PAYMENT=f.MONTHLY_PAYMENT.getValue();
h.TERM=f.TERM.getValue();
h.BY_YEAR=f.YEAR.getValue();
var e=KJE.EnhancedLoanCalc.CALC_INDEX.length;
for(var g=0;
g<e;
g++){if(h.CALCULATE_THIS==g){this.tfInput[g].disable()
}else{this.tfInput[g].enable()
}}};
KJE.EnhancedLoan.prototype.refresh=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
KJE.setTitleTemplate(i.dollars(h.LOAN_AMOUNT),i.dollars(h.MONTHLY_PAYMENT,2));
g.removeAll();
g.setGraphCategories(h.cats);
if(h.TERM>120){g.setTitle(this.MSG_GRAPH_TITLE1)
}else{g.setTitle(this.MSG_GRAPH_TITLE2)
}g.add(new KJE.gGraphDataSeries(h.DS_BALANCE,this.MSG_GRAPH_LBL1,g.getColor(1)));
g.paint();
this.tfInput[KJE.EnhancedLoanCalc.CALC_AMOUNT].setText(i.dollars(h.LOAN_AMOUNT),true);
this.tfInput[KJE.EnhancedLoanCalc.CALC_RATE].setText(i.percent(h.INTEREST_RATE/100,3),true);
this.tfInput[KJE.EnhancedLoanCalc.CALC_PAYMENT].setText(i.dollars(h.MONTHLY_PAYMENT,2),true);
this.tfInput[KJE.EnhancedLoanCalc.CALC_TERM].setText(i.number(h.INPUT_YEARS?h.TERM/12:h.TERM),true)
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id=\"KJE-C-CALC_INDEX\">**CALC_INDEX**</div> <div id='KJE-C-LOAN_AMOUNT'><input id='KJE-LOAN_AMOUNT' /></div> <div id='KJE-C-INTEREST_RATE'><input id='KJE-INTEREST_RATE' /></div> <div id='KJE-C-MONTHLY_PAYMENT'><input id='KJE-MONTHLY_PAYMENT' /></div> <div id='KJE-C-TERM'><input id='KJE-TERM' /></div> <div id=\"KJE-C-YEAR\"><fieldset id='KJE-FS-YEAR'><input id=\"KJE-YEAR1\" type=radio name=YEAR /><input id=\"KJE-YEAR2\" type=radio name=YEAR /></fieldset></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-MONTHLY_PAYMENT' ><dt>Monthly payment</dt><dd>Monthly payment for this loan.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Interest rate</dt><dd>Annual interest rate for this loan. Interest is calculated monthly on the current outstanding balance of your loan at 1/12 of the annual rate.</dd></div> <div id='KJE-D-TERM' ><dt>Term in months</dt><dd>Number of months for this loan.</dd></div> <div id='KJE-D-LOAN_AMOUNT' ><dt>Loan amount</dt><dd>Total amount of your loan.</dd></div> ";
KJE.ReportText=' <!--HEADING "Enhanced Loan Calculator Results" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Your LOAN_AMOUNT loan has a MONTHLY_PAYMENT monthly payment for LOAN_MONTHS months.</h2> If you make all of your payments on this loan, and do not prepay any of the principal, the total interest for this loan is TOTAL_INTEREST. **GRAPH** <p> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Monthly payment</th><td class="KJECell KJECell40">MONTHLY_PAYMENT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan amount</th><td class="KJECell">LOAN_AMOUNT</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate</th><td class="KJECell">INTEREST_RATE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Term</th><td class="KJECell">LOAN_MONTHS months</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest </th><td class="KJECell">TOTAL_INTEREST</td></tr> </tbody> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment Schedule</h2> **REPEATING GROUP** ';
KJE.parameters.set("NEW_LOAN_BALANCE",250000);
KJE.parameters.set("NEW_LOAN_PAYMENT",100);
KJE.parameters.set("NEW_LOAN_RATE",6.9);
KJE.parameters.set("NEW_LOAN_TERM",30);
KJE.parameters.set("CALC_INDEX",KJE.EnhancedLoanCalc.CALC_PAYMENT);
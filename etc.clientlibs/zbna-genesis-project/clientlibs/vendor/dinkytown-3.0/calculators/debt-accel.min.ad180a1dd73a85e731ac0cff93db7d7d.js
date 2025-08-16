KJE.DebtCalculation=function(){this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Rate must be at least 0.00%.");
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Term must be greater than zero.");
this.MSG_ERROR3=KJE.parameters.get("MSG_ERROR3","Payment must be greater than zero.");
this.MSG_ERROR4=KJE.parameters.get("MSG_ERROR4","Calculated loan balance is less than zero.");
this.MSG_ERROR8=KJE.parameters.get("MSG_ERROR8","Please increase the monthly payment, current payment doesn't payoff loan.");
this.MSG_ERROR6=KJE.parameters.get("MSG_ERROR6","Balance must be greater than zero.");
this.MSG_ERROR7=KJE.parameters.get("MSG_ERROR7","Calculated loan payment exceeds $500,000.");
this.MSG_ERROR9=KJE.parameters.get("MSG_ERROR9","Loan balance must be at least KJE1.");
this.MSG_PAYOFF_30=KJE.parameters.get("MSG_PAYOFF_30","more than 30 years");
this.MSG_TITLE1=KJE.parameters.get("MSG_TITLE1","Your plan could save you KJE1 in interest.");
this.MSG_TITLE2=KJE.parameters.get("MSG_TITLE2","Your plan could cost you KJE1 in additional interest.");
this.MSG_TITLE_AMOUNT=KJE.parameters.get("MSG_TITLE_AMOUNT","You owe a total of KJE1.");
this.MSG_TITLE_INVEST=KJE.parameters.get("MSG_TITLE_INVEST","Your investment could be worth KJE1 after KJE2 years.");
this.MSG_LESS=KJE.parameters.get("MSG_LESS","less");
this.MSG_MORE=KJE.parameters.get("MSG_MORE","more");
this.LOAN_CURRENT_CALC_PAYMENT=KJE.parameters.get("LOAN_CURRENT_CALC_PAYMENT",false);
this.CALCULATE_LOAN_AMOUNT=KJE.parameters.get("CALCULATE_LOAN_AMOUNT",true);
this.bInterestOnly=false;
this.CANADIAN=KJE.parameters.get("CANADIAN",false);
this.MORTGAGE_CONSOLIDATE=KJE.parameters.get("MORTGAGE_CONSOLIDATE",false);
this.CALC_INVESTMENT=KJE.parameters.get("CALC_INVESTMENT",false);
this.USE_LOAN_TYPE=KJE.parameters.get("USE_LOAN_TYPE",true);
this.SHOW_TAXES=KJE.parameters.get("SHOW_TAXES",false);
this.d30_LOAN_TERM=KJE.parameters.get("30_LOAN_TERM",0);
this.d30_LOAN_RATE=KJE.parameters.get("30_LOAN_RATE",0);
this.FORCE_CALC=true;
this.FIRST_YEARS_INTEREST=0;
this.CALC_ACCEL=KJE.parameters.get("CALC_ACCEL",false);
this.CALC_AMOUNT=1;
this.CALC_RATE=2;
this.CALC_TERM=3;
this.CALC_PAYMENT=4;
this.LAST_CHANGED=this.CALC_AMOUNT;
this.oNEW_LOAN_PAYMENT=0;
this.OLD_OUTSTANDING_BALANCE=-1;
this.CC_MIN=KJE.parameters.get("KJE_CC_MIN_PAYMENTAMOUNT",15);
this.CC_USE_MINIMUM=false;
this.ACCELERATE_BALANCE=0;
this.LOAN_TERM_LABEL="";
this.CC_MONTHLY_PAYMENT=0;
this.CC_AVERAGE_RATE=0;
this.CC_OUTSTANDING_BALANCE=0;
this.INCOME_TAX_RATE=0;
this.NEW_LOAN_BALANCE=0;
this.NEW_LOAN_RATE=0;
this.NEW_LOAN_PAYMENT=0;
this.NEW_LOAN_TERM=0;
this.AVAIL_MARGIN=0;
this.ACC_LOAN_PAYMENT=0;
this.CURRENT_PAYOFF="";
this.CURRENT_PAYOFF_MONTHS=0;
this.NEW_PAYOFF="";
this.ACCEL_PAYOFF="";
this._iCCCount=0;
this._iLNCount=0;
this._iALCount=0;
this.bFrance=false;
this.AVAIL_MARGIN_CALC=true;
this.AMOUNT_ONLY=KJE.parameters.get("AMOUNT_ONLY",false);
this.TAX_SAVINGS=0;
this.DS_PAYMENT_CATS=[KJE.parameters.get("MSG_PAYMENT_CATS1","Current")+" ",KJE.parameters.get("MSG_PAYMENT_CATS2","Consolidated")+" "];
if(this.CALC_ACCEL){this.DS_PAYMENT_CATS[2]=KJE.parameters.get("MSG_PAYMENT_CATS3","Accelerated")+" "
}this.INVESTMENT_PERCENT=0;
this.RETURN_PERCENT=0;
this.NEW_LOAN_FEES=0;
this.NET_CASH=0;
this.AVAIL_MARGIN=0;
this.sSchedule=new KJE.Repeating()
};
KJE.DebtCalculation.prototype.clear=function(){};
KJE.DebtCalculation.prototype.calculate=function(aX){var a4=KJE;
if(this.MORTGAGE_CONSOLIDATE&&this.USE_LOAN_TYPE){this.NEW_LOAN_TERM=KJE.DebtCalculation.dProductTerm[this.LOAN_TYPE_INDEX];
this.bInterestOnly=KJE.DebtCalculation.dProductIO[this.LOAN_TYPE_INDEX];
var bG=true
}else{this.LOAN_TERM_LABEL=KJE.DebtCalculation.sProductList[this.LOAN_TYPE_INDEX];
var bG=KJE.DebtCalculation.dProductMortgage[this.LOAN_TYPE_INDEX];
if(bG){}else{bG=this.MORTGAGE_CONSOLIDATE
}}var bt=0;
var aR=0;
var bp=0;
var aZ=0;
var aN=0;
var b1=0;
var bj=0;
var a0=0;
var bm=0;
var a5=0;
var aP=0;
var bw=0;
var bS=0;
var a1=this.CC_USE_MINIMUM;
var bA=this.CC_MIN;
var br=this.CC_BALANCE;
var bs=this.CC_RATE;
var aW=this.CC_PAYMENT;
var n=this.CC_OLD;
var bo=this.LOAN_CURRENT_BALANCE;
var bN=this.LOAN_PAYMENT;
var y=this.LOAN_INTEREST_RATE;
var bd=this.LOAN_MONTHS_LEFT;
var bM=this.ccBal;
var i=this.loanBal;
var be=0;
var bb=0;
var bl=0;
var bn=0;
var bT=0;
for(be=0;
be<this._iCCCount;
be++){if(((n[be]!=br[be]+bs[be])||a1)&&(this.FORCE_CALC)){aW[be]=this.CCPayment(true,br[be],aW[be],bA);
bl=a4.round(br[be]*(bs[be]/1200),KJE.LoanRateDecimals);
if(aW[be]>(br[be]+bl)){aW[be]=(br[be]+bl)
}n[be]=br[be]+bs[be]
}}for(bb=0;
bb<this._iLNCount;
bb++){if(bN[bb]>0||bo[bb]>0){if(this.LOAN_CURRENT_CALC_PAYMENT){bN[bb]=KJE.PMT(y[bb]/1200,bd[bb],bo[bb]);
if(bN[bb]>500000){throw (this.MSG_ERROR7)
}}else{bd[bb]=KJE.PERIODS(y[bb]/1200,bN[bb],bo[bb]);
if(bd[bb]>500){if(this.oLOAN_PAYMENT[bb]){throw new KJE.errorObject(this.MSG_ERROR8,this.oLOAN_PAYMENT[bb])
}else{throw (this.MSG_ERROR8)
}}}}if(this.oLOAN_PAYMENT[bb]){this.oLOAN_PAYMENT[bb].setGoodInput()
}if(bo[bb]>0){bt+=bN[bb]
}aR+=bo[bb]*y[bb];
if(bb<this._iALCount){if(bo[bb]>0){bj+=bN[bb]
}bm+=bo[bb];
a0+=bo[bb]*y[bb]
}else{if(bo[bb]>0){a5+=bN[bb]
}bw+=bo[bb];
aP+=bo[bb]*y[bb]
}}for(bb=0;
bb<this._iCCCount;
bb++){if(br[bb]>0){bt+=aW[bb]
}aR+=br[bb]*bs[bb];
if(br[bb]>0){aN+=aW[bb]
}aZ+=br[bb];
b1+=br[bb]*bs[bb]
}bp+=aZ+bm+bw;
if(b1>0&&aZ>0){b1=(b1/100)/aZ
}else{b1=0
}if(aR>0&&bp>0){aR=(aR/100)/bp
}else{aR=0
}if(a0>0&&bm>0){a0=(a0/100)/bm
}else{a0=0
}if(aP>0&&bw>0){aP=(aP/100)/bw
}else{aP=0
}var bF=this.NEW_LOAN_PAYMENT;
var bW=this.NEW_LOAN_BALANCE;
this.LAST_CHANGED=this.CALC_AMOUNT;
if(bp!=this.OLD_OUTSTANDING_BALANCE){bW=bp+this.NEW_LOAN_FEES;
this.LAST_CHANGED=this.CALC_AMOUNT
}else{if(this.oNEW_LOAN_PAYMENT!=bF){this.LAST_CHANGED=this.CALC_PAYMENT
}}var bE=this.NEW_LOAN_RATE/1200;
if(this.CANADIAN&&bG){bE=(Math.pow(1+(this.NEW_LOAN_RATE/200),1/6)-1)
}if(this.NEW_LOAN_RATE<0){throw (this.MSG_ERROR1)
}if(this.NEW_LOAN_TERM<=0){throw (this.MSG_ERROR2)
}if(this.LAST_CHANGED==this.CALC_PAYMENT){if(bF<=0){throw (this.MSG_ERROR3)
}if(this.bInterestOnly){bW=a4.round(bF/(bE),2)
}else{if(this.CALCULATE_LOAN_AMOUNT){bW=a4.round(KJE.PV(bE,this.NEW_LOAN_TERM,bF),2);
if(bW<0){throw (this.MSG_ERROR4)
}if(bW>=10000000){throw (this.MSG_ERROR5)
}}else{this.NEW_LOAN_TERM=Math.ceil(KJE.PERIODS(bE,bF,bW))
}}}else{if(bW<0){throw (this.MSG_ERROR6)
}if(this.bInterestOnly){bF=a4.round((bE)*bW,2)
}else{bF=a4.round(KJE.PMT(bE,this.NEW_LOAN_TERM,bW),2)
}if(bF>=500000){throw (this.MSG_ERROR7)
}}if(!this.AMOUNT_ONLY){if(Math.round(bW)<(Math.round(bp+this.NEW_LOAN_FEES))){throw (KJE.getKJEReplaced(this.MSG_ERROR9,a4.dollars(bp+this.NEW_LOAN_FEES)))
}}this.oNEW_LOAN_PAYMENT=a4.round(bF,2);
var b0=1;
if(!this.AMOUNT_ONLY){b0++;
if(this.CALC_ACCEL&&!this.CALC_INVESTMENT){b0++;
this.AVAIL_MARGIN=((bt-bF)<0?0:bt-bF);
if(this.AVAIL_MARGIN>100000){this.AVAIL_MARGIN=100000
}if(this.OLD_AVAIL_MARGIN!=this.AVAIL_MARGIN&&this.AVAIL_MARGIN_CALC){this.ACCELERATE_BALANCE=this.AVAIL_MARGIN;
this.OLD_AVAIL_MARGIN=this.AVAIL_MARGIN
}this.ACC_LOAN_PAYMENT=bF+this.ACCELERATE_BALANCE
}}else{this.AVAIL_MARGIN=0;
this.ACC_LOAN_PAYMENT=bF
}if(this.CALC_INVESTMENT){this.NET_CASH=Math.round(bW-bp-this.NEW_LOAN_FEES);
this.NET_CASH=(this.NET_CASH<=0?0:this.NET_CASH);
this.AVAIL_MARGIN=((bt-bF)<0?0:bt-bF);
if(this.INVESTMENT_PERCENT==0){this.ACCELERATE_BALANCE=this.AVAIL_MARGIN
}else{this.ACCELERATE_BALANCE=(this.INVESTMENT_PERCENT==100?0:Math.round(this.AVAIL_MARGIN*(1-this.INVESTMENT_PERCENT/100)))
}this.ACC_LOAN_PAYMENT=bF+this.ACCELERATE_BALANCE;
this.ACC_INVESTMENT_AMT=this.AVAIL_MARGIN-this.ACCELERATE_BALANCE
}var bD=this.DS_PAYMENTS=new Array(b0);
var bz=this.DS_PAYMENTS_BLD=new Array(b0);
var bL=this.DS_INTEREST=new Array(b0);
var u=this.DS_INTEREST_BLD=new Array(b0);
var aT=this.DS_MONTHS=new Array(b0);
var bR=this.DS_MONTHS_BLD=new Array(b0);
var a7=Math.round(this.NEW_LOAN_TERM);
var bK=0;
var bB=a7;
var a9=0;
var bq=this.DR_BALANCE=KJE.FloatArray(a7);
var bI=this.DR_PRINCIPAL=KJE.FloatArray(a7);
var aV=this.DR_INTEREST=KJE.FloatArray(a7);
var aO=this.DR_NEW_BALANCE=KJE.FloatArray(a7);
var bZ=this.DR_NEW_PRINCIPAL=KJE.FloatArray(a7);
var bx=this.DR_NEW_INTEREST=KJE.FloatArray(a7);
if(this.CALC_ACCEL){var bJ=this.DR_ACCEL_BALANCE=KJE.FloatArray(a7);
var bh=this.DR_ACCEL_PRINCIPAL=KJE.FloatArray(a7);
var b2=this.DR_ACCEL_INTEREST=KJE.FloatArray(a7)
}if(this.CALC_INVESTMENT){var a8=this.DR_INVEST_PAYMENTS=KJE.FloatArray(a7);
var bg=this.DR_INVEST_INTEREST=KJE.FloatArray(a7);
var aS=this.DR_INVEST_BALANCE=KJE.FloatArray(a7)
}var a3=0;
var a6=0;
var bu=0;
var bQ=bp;
var bX=0;
var bi=0;
var q=bW;
var aU=0;
var a2=0;
var bH=bW;
var bk=0;
var ba=KJE.ROR_MONTH(this.RETURN_PERCENT/100);
var aY=KJE.DebtCalculation.MAXIMUM_TERM;
for(bb=0;
(bb<aY+1);
bb++){if(bQ<=0&&bb>a7){break
}bQ=0;
if(bb<a7){bX=a4.round(q*(bE),2);
bi=bF-bX;
if(q<bi){bi=q;
q=0
}else{q-=bi
}if(a7-1==bb){if(q>0.005){bi+=q;
q=0
}else{q=0
}}aO[bb]=q;
bx[bb]=bX;
bZ[bb]=bi;
a6+=bX;
if(this.CALC_ACCEL){aU=a4.round(bH*(bE),2);
a2=this.ACC_LOAN_PAYMENT-aU;
bH-=a2;
bk=0;
if(bH<0){bk=bH*-1;
a2+=bH;
bH=0
}bJ[bb]=bH;
b2[bb]=aU;
bh[bb]=a2;
if(bJ[bb]<=0){bJ[bb]=0;
if(bB==a7){bB=bb+1
}}else{bu+=aU
}if(this.CALC_INVESTMENT){a8[bb]=this.ACC_INVESTMENT_AMT+bk;
bg[bb]=ba*(bb==0?this.NET_CASH:aS[bb-1]);
bS=aS[bb]=bg[bb]+(bb==0?this.NET_CASH:aS[bb-1])+a8[bb]
}}}for(be=0;
be<this._iCCCount;
be++){if(aW[be]>0){if(bb==0){bM[be]=br[be]
}bl=a4.round(bM[be]*(bs[be]/1200),2);
bn=this.CCPayment(a1,bM[be],aW[be],bA);
bT=((bn-bl)>bM[be]?bM[be]:bn-bl);
a3+=bl;
bM[be]-=bT;
if(bb<a7){bq[bb]+=bM[be];
aV[bb]+=bl;
bI[bb]+=bT
}bQ+=bM[be]
}}for(be=0;
be<this._iLNCount;
be++){if(bN[be]>0&&bo[be]==0){throw (this.MSG_ERROR6)
}if(bN[be]==0&&bo[be]>0){if(this.oLOAN_PAYMENT[be]){throw new KJE.errorObject(this.MSG_ERROR3,this.oLOAN_PAYMENT[be])
}else{throw (this.MSG_ERROR3)
}}else{if(this.oLOAN_PAYMENT[be]){this.oLOAN_PAYMENT[be].setGoodInput()
}}if(bN[be]>0||bo[be]>0){if(bb==0){i[be]=bo[be]
}bl=a4.round(i[be]*(y[be]/1200),2);
bT=((bN[be]-bl)>i[be]?i[be]:bN[be]-bl);
a3+=a4.round(i[be]*(y[be]/1200),2);
i[be]-=bT;
if(bb<a7){bq[bb]+=i[be];
aV[bb]+=bl;
bI[bb]+=bT
}bQ+=i[be]
}}if(bQ<=0&&bK==0){bK=bb+1
}}if(bK==0){bK=KJE.DebtCalculation.MAXIMUM_TERM;
this.CURRENT_PAYOFF=this.MSG_PAYOFF_30
}else{this.CURRENT_PAYOFF=KJE.getTermLabel(bK,false)
}this.CURRENT_PAYOFF_MONTHS=bK;
this.NEW_PAYOFF=KJE.getTermLabel(a7,false);
this.ACCEL_PAYOFF=KJE.getTermLabel(bB,false);
bD[0]=(bt);
bz[0]=a4.dollars(bt);
bL[0]=(a3);
u[0]=a4.dollars(a3);
aT[0]=bK;
bR[0]=a4.number(bK)+" "+KJE.MSG_MONTHS_LBL;
if(bK==KJE.DebtCalculation.MAXIMUM_TERM){bR[0]=" > "+bR[0]
}if(!this.AMOUNT_ONLY){bL[1]=(a6);
u[1]=a4.dollars(a6);
bz[1]=a4.dollars(bF);
bD[1]=bF;
aT[1]=a7;
bR[1]=a4.number(a7)+" "+KJE.MSG_MONTHS_LBL;
if(this.CALC_ACCEL){u[2]=a4.dollars(bu);
bL[2]=(bu);
bz[2]=a4.dollars(this.ACC_LOAN_PAYMENT);
bD[2]=(this.ACC_LOAN_PAYMENT);
aT[2]=bB;
bR[2]=a4.number(bB)+" "+KJE.MSG_MONTHS_LBL
}}if(aX){var bU=this.sSchedule;
if(this.CALC_INVESTMENT){bU.clearRepeat();
bU.addHeader({sCell:KJE._sHeadingUnderline,sContent:(bU.sReportCol("Planned loan payment of",5)+" "+a4.dollars(this.ACC_LOAN_PAYMENT,2)+bU.sReportCol("",6)),sFormat:"colspan=4"},{sCell:KJE._sHeadingUnderline,sContent:bU.sReportCol("Investment Balance",7),sFormat:"colspan=3"});
bU.addHeader("&nbsp;",bU.sReportCol("Payment",1),bU.sReportCol("Interest",2),bU.sReportCol("Balance",3),bU.sReportCol("Investment Contributions",1),bU.sReportCol("Interest",2),bU.sReportCol("Balance",3));
bU.addRepeat("&nbsp;","&nbsp;","&nbsp;",a4.dollars(bW,2),"&nbsp;","&nbsp;",a4.dollars(this.NET_CASH,2))
}else{if(this.CALC_ACCEL){bU.clearRepeat();
bU.addHeader({sCell:KJE._sHeadingUnderline,sContent:(bU.sReportCol("Consolidated loan payment of",5)+" "+a4.dollars(bF,2)+bU.sReportCol("",6)),sFormat:"colspan=4"},{sCell:KJE._sHeadingUnderline,sContent:(bU.sReportCol("Accelerated payment of",7)+" "+a4.dollars(this.ACC_LOAN_PAYMENT,2)+bU.sReportCol("",8)),sFormat:"colspan=3"});
bU.addHeader("&nbsp;",bU.sReportCol("Interest",1),bU.sReportCol("Principal",2),bU.sReportCol("Balance",3),bU.sReportCol("Interest",1),bU.sReportCol("Principal",2),bU.sReportCol("Balance",3));
bU.addRepeat("&nbsp;","&nbsp;","&nbsp;",a4.dollars(bW,2),"&nbsp;","&nbsp;",a4.dollars(bW,2))
}else{bU.addHeader("&nbsp;",bU.sReportCol("Interest",1),bU.sReportCol("Principal",2),bU.sReportCol("Payment",4),bU.sReportCol("Balance",3));
bU.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",a4.dollars(bW,2))
}}}var bf=0;
a7=(this.AMOUNT_ONLY?bK:a7);
var by=1;
if(a7>=120){by=12
}this.FIRST_YEARS_INTEREST=0;
for(var bc=0;
bc<12&&bc<bx.length;
bc++){this.FIRST_YEARS_INTEREST+=bx[bc]
}this.TAX_SAVINGS=(this.SHOW_TAXES&&bG&&!this.CANADIAN?a4.round(this.FIRST_YEARS_INTEREST*(this.INCOME_TAX_RATE/100),2):0);
var bY=Math.ceil(a7/by+1);
var aQ=this.cats=new Array(bY);
var bv=this.DS_BALANCE=KJE.FloatArray(bY);
var bP=this.DS_NEW_BALANCE=KJE.FloatArray(bY);
if(this.CALC_ACCEL){var aM=this.DS_ACCEL_BALANCE=KJE.FloatArray(bY)
}if(this.CALC_INVESTMENT){var bV=this.DS_INVEST_BALANCE=KJE.FloatArray(bY)
}aQ[bf]="0";
bv[bf]=bp;
if(this.CALC_ACCEL){aM[bf]=bW
}bP[bf++]=bW;
for(bb=1;
bb<=a7;
bb++){a9=bb-1;
if(bb%by==0){aQ[bf]=""+(a7<120?bf*by:bf);
if(this.CALC_ACCEL){aM[bf]=bJ[a9]
}if(this.CALC_INVESTMENT){bV[bf]=aS[a9]
}bv[bf]=bq[a9];
bP[bf++]=aO[a9]
}if(aX){if(this.CALC_INVESTMENT){bU.addRepeat(bb,a4.dollars(b2[a9]+bh[a9],2),a4.dollars(b2[a9],2),a4.dollars(bJ[a9],2),a4.dollars(a8[a9],2),a4.dollars(bg[a9],2),a4.dollars(aS[a9],2))
}else{if(this.CALC_ACCEL){bU.addRepeat(bb,a4.dollars(bx[a9],2),a4.dollars(bZ[a9],2),a4.dollars(aO[a9],2),a4.dollars(b2[a9],2),a4.dollars(bh[a9],2),a4.dollars(bJ[a9],2))
}else{if(this.AMOUNT_ONLY){bU.addRepeat(bb,a4.dollars(aV[a9],2),a4.dollars(bI[a9],2),a4.dollars(aV[a9]+bI[a9],2),a4.dollars(bq[a9],2))
}else{bU.addRepeat(bb,a4.dollars(bx[a9],2),a4.dollars(bZ[a9],2),a4.dollars(bx[a9]+bZ[a9],2),a4.dollars(aO[a9],2))
}}}}}if(bf<aQ.length){aQ[bf]=""+(a7<120?bf*by:bf)
}var bO=a3-a6;
if(this.CALC_ACCEL){bO=a3-bu
}var bC="";
if(this.AMOUNT_ONLY){bC=KJE.getKJEReplaced(this.MSG_TITLE_AMOUNT,a4.dollars(bp),a4.dollars(a3))
}else{if(this.CALC_INVESTMENT){bC=KJE.getKJEReplaced(this.MSG_TITLE_INVEST,a4.dollars(bS),a4.number(this.NEW_LOAN_TERM/12))
}else{if(bO>0){bC=KJE.getKJEReplaced(this.MSG_TITLE1,a4.dollars(bO,2))
}else{bC=KJE.getKJEReplaced(this.MSG_TITLE2,a4.dollars(-1*(bO),2))
}}}this.MSG_TITLE=KJE.replace("NEW_LOAN_PAYMENT",KJE.dollars(bF,2),bC);
if(this.d30_LOAN_TERM>0&&this.d30_LOAN_RATE>0){this.d30_LOAN_PAYMENT=a4.round(KJE.PMT(this.d30_LOAN_RATE/1200,this.d30_LOAN_TERM*12,bW),2);
this.d30_INTEREST=this.d30_LOAN_PAYMENT*this.d30_LOAN_TERM*12-bW
}else{this.d30_LOAN_PAYMENT=0;
this.d30_INTEREST=0
}this.INTEREST_CURRENT=a3;
this.INTEREST_NEW=a6;
this.INTEREST_ACCEL=bu;
this.ENDING_INVESTMENT_BAL=bS;
this.MONTHLY_PAYMENT=bt;
this.AVERAGE_RATE=aR;
this.OUTSTANDING_BALANCE=bp;
this.CC_MONTHLY_PAYMENT=aN;
this.CC_AVERAGE_RATE=b1;
this.CC_OUTSTANDING_BALANCE=aZ;
this.AUTO_MONTHLY_PAYMENT=bj;
this.AUTO_AVERAGE_RATE=a0;
this.AUTO_OUTSTANDING_BALANCE=bm;
this.OTHER_MONTHLY_PAYMENT=a5;
this.OTHER_AVERAGE_RATE=aP;
this.OTHER_OUTSTANDING_BALANCE=bw;
this.OLD_OUTSTANDING_BALANCE=bp;
this.NEW_LOAN_PAYMENT=bF;
this.NEW_LOAN_BALANCE=bW
};
KJE.DebtCalculation.prototype.formatReport=function(d){var c=KJE;
if(this.bInterestOnly){d.replace("<!--INTEREST_ONLY","<!--");
d.replace("INTEREST_ONLY-->","-->")
}else{d.replace("<!--INTEREST_ONLY","");
d.replace("INTEREST_ONLY-->","")
}d.dollars("CC_OUTSTANDING_BALANCE",this.CC_OUTSTANDING_BALANCE);
d.dollars("CC_MONTHLY_PAYMENT",this.CC_MONTHLY_PAYMENT);
d.loanRate("CC_AVERAGE_RATE",this.CC_AVERAGE_RATE);
d.dollars("AUTO_MONTHLY_PAYMENT",this.AUTO_MONTHLY_PAYMENT);
d.loanRate("AUTO_AVERAGE_RATE",this.AUTO_AVERAGE_RATE);
d.dollars("AUTO_OUTSTANDING_BALANCE",this.AUTO_OUTSTANDING_BALANCE);
d.dollars("OTHER_MONTHLY_PAYMENT",this.OTHER_MONTHLY_PAYMENT);
d.loanRate("OTHER_AVERAGE_RATE",this.OTHER_AVERAGE_RATE);
d.dollars("OTHER_OUTSTANDING_BALANCE",this.OTHER_OUTSTANDING_BALANCE);
d.replace("LOAN_TERM_LABEL",this.LOAN_TERM_LABEL);
if(this.MONTHLY_PAYMENT>this.NEW_LOAN_PAYMENT){d.replace("MONTHLY_PAYMENT_SAVINGS",(this.bFrance?this.MSG_LESS+" ":"")+KJE.dollars(this.MONTHLY_PAYMENT-this.NEW_LOAN_PAYMENT,2)+(this.bFrance?"":" "+this.MSG_LESS))
}else{d.replace("MONTHLY_PAYMENT_SAVINGS",(this.bFrance?" "+this.MSG_MORE+" ":"")+KJE.dollars(this.NEW_LOAN_PAYMENT-this.MONTHLY_PAYMENT,2)+(this.bFrance?"":" "+this.MSG_MORE))
}d.dollars("MONTHLY_PAYMENT",this.MONTHLY_PAYMENT);
d.loanRate("AVERAGE_RATE",this.AVERAGE_RATE);
d.dollars("OUTSTANDING_BALANCE",this.OUTSTANDING_BALANCE);
d.dollars("NEW_LOAN_BALANCE",this.NEW_LOAN_BALANCE);
d.loanRate("NEW_LOAN_RATE",this.NEW_LOAN_RATE/100);
d.dollars("NEW_LOAN_PAYMENT",this.NEW_LOAN_PAYMENT);
d.number("NEW_LOAN_TERM",this.NEW_LOAN_TERM);
d.dollars("ACCELERATE_BALANCE",this.ACCELERATE_BALANCE);
d.dollars("ACC_LOAN_PAYMENT",this.ACC_LOAN_PAYMENT);
d.replace("CURRENT_PAYOFF",this.CURRENT_PAYOFF);
d.replace("ACCEL_PAYOFF",this.ACCEL_PAYOFF);
d.replace("NEW_PAYOFF",this.NEW_PAYOFF);
d.dollars("INTEREST_CURRENT",this.INTEREST_CURRENT);
d.dollars("INTEREST_NEW",this.INTEREST_NEW);
d.dollars("INTEREST_ACCEL",this.INTEREST_ACCEL);
d.replace("MSG_TITLE",(this.MSG_TITLE));
d.number("NEW_LOAN_YEARS",this.NEW_LOAN_TERM/12);
if(this.d30_LOAN_TERM>0&&this.d30_LOAN_RATE>0){d.number("30_LOAN_TERM",this.d30_LOAN_TERM);
d.dollars("30_LOAN_BALANCE",this.NEW_LOAN_BALANCE);
d.loanRate("30_LOAN_RATE",this.d30_LOAN_RATE/100);
d.dollars("30_LOAN_PAYMENT",this.d30_LOAN_PAYMENT);
d.dollars("30_INTEREST_SAVINGS",this.d30_INTEREST-this.INTEREST_NEW);
d.dollars("30_INTEREST",this.d30_INTEREST)
}if(this.INTEREST_CURRENT>=this.INTEREST_ACCEL){d.replace("MSG_ACCEL_INTEREST_SAVINGS",(this.bFrance?this.MSG_LESS+" ":"")+c.dollars(this.INTEREST_NEW-this.INTEREST_ACCEL,2)+" "+(this.bFrance?"":" "+this.MSG_LESS))
}else{d.replace("MSG_ACCEL_INTEREST_SAVINGS",(this.bFrance?this.MSG_MORE+" ":"")+c.dollars(this.INTEREST_ACCEL-this.INTEREST_NEW,2)+(this.bFrance?"":" "+this.MSG_MORE))
}d.dollars("ACCEL_INTEREST_SAVINGS",this.INTEREST_CURRENT-this.INTEREST_ACCEL);
if(this.INTEREST_CURRENT>=this.INTEREST_NEW){d.replace("MSG_NEW_INTEREST_SAVINGS",(this.bFrance?this.MSG_LESS+" ":"")+c.dollars(this.INTEREST_CURRENT-this.INTEREST_NEW,2)+(this.bFrance?"":" "+this.MSG_LESS))
}else{d.replace("MSG_NEW_INTEREST_SAVINGS",(this.bFrance?this.MSG_MORE+" ":"")+c.dollars(this.INTEREST_NEW-this.INTEREST_CURRENT,2)+(this.bFrance?"":" "+this.MSG_MORE))
}d.dollars("NEW_INTEREST_SAVINGS",this.INTEREST_CURRENT-this.INTEREST_NEW);
if(this.INTEREST_CURRENT>=this.INTEREST_ACCEL){d.replace("MSG_INTEREST_SAVINGS",(this.bFrance?this.MSG_LESS+" ":"")+c.dollars(this.INTEREST_CURRENT-this.INTEREST_ACCEL,2)+(this.bFrance?"":" "+this.MSG_LESS))
}else{d.replace("MSG_INTEREST_SAVINGS",(this.bFrance?this.MSG_MORE+" ":"")+c.dollars(this.INTEREST_ACCEL-this.INTEREST_CURRENT,2)+(this.bFrance?"":" "+this.MSG_MORE))
}d.dollars("INTEREST_SAVINGS",this.INTEREST_NEW-this.INTEREST_ACCEL);
d.taxRate("INCOME_TAX_RATE",this.INCOME_TAX_RATE/100);
d.dollars("FIRST_YEARS_INTEREST",this.FIRST_YEARS_INTEREST);
d.dollars("TAX_SAVINGS",this.TAX_SAVINGS);
d.dollars("ENDING_INVESTMENT_BAL",this.ENDING_INVESTMENT_BAL);
d.dollars("NET_CASH",this.NET_CASH);
d.dollars("AVAIL_MARGIN",this.AVAIL_MARGIN);
d.percent("INVESTMENT_PERCENT",this.INVESTMENT_PERCENT/100);
d.dollars("ACC_INVESTMENT_AMT",this.ACC_INVESTMENT_AMT);
d.returnRate("RETURN_PERCENT",this.RETURN_PERCENT/100);
d.replace("**FOOTER1**",(this.FOOTER1?this.FOOTER1:""));
d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());
return d.get()
};
KJE.DebtCalculation.prototype.setLoanCount=function(h,f,e){this._iCCCount=h;
this._iLNCount=f;
this._iALCount=e;
this.CC_BALANCE=KJE.FloatArray(h);
this.CC_RATE=KJE.FloatArray(h);
this.CC_PAYMENT=KJE.FloatArray(h);
this.CC_OLD=KJE.FloatArray(h);
this.CC_NAME=new Array(h);
this.LOAN_CURRENT_BALANCE=KJE.FloatArray(f);
this.LOAN_PAYMENT=KJE.FloatArray(f);
this.LOAN_MONTHS_LEFT=KJE.FloatArray(f);
this.LOAN_INTEREST_RATE=KJE.FloatArray(f);
this.oLOAN_PAYMENT=new Array(f);
this.ccBal=KJE.FloatArray(h);
this.loanBal=KJE.FloatArray(f);
this.MSG_MONTHS=KJE.parameters.get("MSG_MONTHS","mo.");
this.MSG_MONTHS_TWO=KJE.parameters.get("MSG_MONTHS_TWO","(MSG_YEAR)");
this.bFrance=KJE.parameters.get("MSG_CHANGE_PREFIX",false);
for(var g=0;
g<h;
g++){this.CC_NAME[g]=KJE.parameters.get("CC_NAME_"+(g+1),KJE.parameters.get("MSG_CREDIT_CARD","Credit card")+" "+(g+1))
}this.CC_USE_MINIMUM=KJE.parameters.get("CC_MINIMUMS",true)
};
KJE.DebtCalculation.prototype.CCPayment=function(j,i,h,f){var g=KJE.round(0.04*i,2);
if(j){g=(g<f?f:g)
}else{g=h
}return(i<=0?0:g)
};
KJE.DebtCalculation.prototype.getProductTerm=function(j){var i=0;
var d=KJE.DebtCalculation.sProductList.length;
var g=KJE.DebtCalculation.sProductList;
for(var h=0;
h<d;
h++){if(j==(g[h])){i=KJE.DebtCalculation.dProductTerm.dProductTerm[h];
break
}}return i
};
KJE.DebtCalculation.INPUT_YEARS=false;
KJE.DebtCalculation.dTerm=[12,24,36,48,60,72,84,96,108,120,144,180,240,300,360];
KJE.DebtCalculation.sTerm=new Array();
KJE.DebtCalculation.MAXIMUM_TERM=360;
KJE.DebtCalculation.MAXIMUM_TERM2=30;
KJE.DebtCalculation.aTerm=["12"," 72","120","360"];
KJE.DebtCalculation.aTerm2=["1","6","15","30"];
KJE.DebtCalculation.sProductList=KJE.parameters.get("ARRAY_PRODUCT_LIST",["NA - Make interest-only payments (HELOC only)","5 Year Loan","10 Year Loan","15 Year Loan"]);
KJE.DebtCalculation.dProductTerm=KJE.parameters.get("ARRAY_PRODUCT_TERM",[120,60,120,180]);
KJE.DebtCalculation.dProductIO=KJE.parameters.get("ARRAY_PRODUCT_IO",[true,false,false,false]);
KJE.DebtCalculation.dProductMortgage=KJE.parameters.get("ARRAY_PRODUCT_MORTGAGE",[false,false,false,false]);
KJE.DebtCalculation.iProductIndex=KJE.parameters.get("ARRAY_PRODUCT_INDEX",[0,1,2,3]);
KJE.DebtCalculation.sOtherLabel=KJE.parameters.get("ARRAY_OTHER_LABELS",["Auto Loan 1","Auto Loan 2","Auto Loan 3","Personal Loan","Real-Estate Loan","Other Loan 1","Other Loan 2","Other Loan 3","Other Loan 4"]);
KJE.DebtCalculation.getTerms=function(){var r=KJE;
var q=KJE.DebtCalculation.INPUT_YEARS=KJE.parameters.get("INPUT_YEARS",KJE.DebtCalculation.INPUT_YEARS);
var o=KJE.DebtCalculation.sTerm;
var m=KJE.DebtCalculation.dTerm;
var s=KJE.DebtCalculation.aTerm;
var n=KJE.DebtCalculation.MAXIMUM_TERM=KJE.parameters.get("MAXIMUM_TERM",this.MAXIMUM_TERM);
var w=KJE.DebtCalculation.MAXIMUM_TERM2=Math.round(KJE.DebtCalculation.MAXIMUM_TERM/12);
if(q){s=KJE.DebtCalculation.aTerm2;
w=KJE.DebtCalculation.MAXIMUM_TERM2=KJE.parameters.get("MAXIMUM_TERM2",KJE.DebtCalculation.MAXIMUM_TERM2);
n=KJE.DebtCalculation.MAXIMUM_TERM=w*12
}var x=KJE.parameters.get("USE_CUSTOM_TERMS",false);
s[s.length-1]=r.number(q?w:n,0);
m[m.length-1]=n;
if(!x){var v=KJE.parameters.get("MSG_MONTHS_TWO","(MSG_YEAR)");
var t=KJE.parameters.get("MSG_YEAR","yr");
var p=KJE.parameters.get("MSG_MONTHS","");
for(var u=0;
u<m.length;
u++){if(m[u]<120||q){o[u]=r.number(m[u]/(q?12:1),0)+" "+(q?t:p)
}else{o[u]=r.number(m[u],0)+" "+KJE.replace("MSG_YEAR",r.number(m[u]/12)+" "+t,v)
}}}KJE.DebtCalculation.sTerm=o;
KJE.DebtCalculation.dTerm=m;
KJE.DebtCalculation.aTerm=s
};
KJE.DebtCalculation.getTermsDesc=function(){return KJE.DebtCalculation.sTerm
};
KJE.CalcName="Accelerated Debt Payoff Calculator";
KJE.CalcType="debtaccel";
KJE.CalculatorTitleTemplate="KJE1";
KJE.parseInputs=function(b){KJE.DebtCalculation.getTerms();
b=KJE.replace("**NEW_LOAN_TERM**",KJE.getDropBox("NEW_LOAN_TERM",KJE.parameters.get("NEW_LOAN_TERM",72),KJE.DebtCalculation.dTerm,KJE.DebtCalculation.sTerm),b);
b=KJE.replace("**LOAN_TYPE_INDEX**",KJE.getDropBox("LOAN_TYPE_INDEX",KJE.parameters.get("LOAN_TYPE_INDEX",0),KJE.DebtCalculation.iProductIndex,KJE.DebtCalculation.sProductList),b);
b=KJE.replace("**MSG_DEBT_HEADER**",KJE.parameters.get("MSG_TITLE5","1.  Enter your current debt balances"),b);
b=KJE.replace("**MSG_NEW_LOAN_HEADER**",KJE.parameters.get("MSG_TITLE6","2.  Calculate your new consolidated loan"),b);
b=KJE.replace("**MSG_ACCELERATE_HEADER**",KJE.parameters.get("MSG_TITLE7","3.  Apply monthly payment savings"),b);
return b
};
KJE.initialize=function(){KJE.CalcControl=new KJE.DebtCalculation();
KJE.GuiControl=new KJE.DebtConsolidate(KJE.CalcControl)
};
KJE.DebtConsolidate=function(J){var M=KJE;
var l=KJE.gLegend;
var F=KJE.inputs.items;
this.NEW_LOAN_TERM_DROPDOWN=KJE.parameters.get("NEW_LOAN_TERM_DROPDOWN",true);
this.CC_COUNT=KJE.parameters.get("CC_COUNT",10);
this.LN_COUNT=KJE.parameters.get("LN_COUNT",9);
this.AL_COUNT=KJE.parameters.get("AL_COUNT",3);
J.setLoanCount(this.CC_COUNT,this.LN_COUNT,this.AL_COUNT);
KJE.Checkbox("CC_USE_MINIMUM","Minimum Payments",true,"Use credit card minimum for payments");
this.CC_PAYMENT=new Array(this.CC_COUNT);
this.CC_BALANCE=new Array(this.CC_COUNT);
this.CC_RATE=new Array(this.CC_COUNT);
this.CC_DIVIDER=new Array(this.CC_COUNT);
for(var G=0;
G<this.CC_COUNT;
G++){KJE.InputItem.AltHelpName="CC_BALANCE";
this.CC_BALANCE[G]=KJE.DollarSlider("CC_BALANCE"+(G+1),KJE.parameters.get("MSG_CC_BALANCE"+(G+1),KJE.replace("MSG_CC_NUMBER",(G+1)+"",KJE.parameters.get("MSG_CC_BALANCE","Credit Card Balance #MSG_CC_NUMBER"))),0,100000,0,0,1,KJE.parameters.get("KJEBoldStyle","bold"));
KJE.InputItem.AltHelpName="CC_RATE";
this.CC_RATE[G]=KJE.PercentSlider("CC_RATE"+(G+1),KJE.parameters.get("MSG_CC_RATE","Interest rate"),0,36,2);
KJE.InputItem.AltHelpName="CC_PAYMENT";
this.CC_PAYMENT[G]=KJE.DollarSlider("CC_PAYMENT"+(G+1),KJE.parameters.get("MSG_CC_PAYMENT","Payment"),0,100000,0,0,0);
if(J.CC_USE_MINIMUM){this.CC_PAYMENT[G].disable()
}J.CC_OLD[G]=this.CC_BALANCE[G].getValue()+this.CC_RATE[G].getValue()
}this.LOAN_CURRENT_BALANCE=new Array(this.LN_COUNT);
this.LOAN_PAYMENT=new Array(this.LN_COUNT);
this.LOAN_INTEREST_RATE=new Array(this.LN_COUNT);
this.LOAN_MONTHS_LEFT=new Array(this.LN_COUNT);
for(var G=0;
G<this.LN_COUNT;
G++){KJE.InputItem.AltHelpName="LOAN_CURRENT_BALANCE";
this.LOAN_CURRENT_BALANCE[G]=KJE.DollarSlider("LOAN_CURRENT_BALANCE"+(G+1),KJE.parameters.get("MSG_LOAN_CURRENT_BALANCE"+(G+1),KJE.DebtCalculation.sOtherLabel[G]),0,10000000,0,0,2,KJE.parameters.get("KJEBoldStyle","bold"));
KJE.InputItem.AltHelpName="LOAN_INTEREST_RATE";
this.LOAN_INTEREST_RATE[G]=KJE.LoanRateSlider("LOAN_INTEREST_RATE"+(G+1),KJE.parameters.get("MSG_LOAN_INTEREST_RATE","Interest rate"));
KJE.InputItem.AltHelpName="LOAN_PAYMENT";
this.LOAN_PAYMENT[G]=KJE.DollarSlider("LOAN_PAYMENT"+(G+1),KJE.parameters.get("MSG_LOAN_PAYMENT","Payment"),0,100000,0,0,0);
KJE.InputItem.AltHelpName="LOAN_MONTHS_LEFT";
this.LOAN_MONTHS_LEFT[G]=KJE.Label("LOAN_MONTHS_LEFT"+(G+1),KJE.parameters.get("MSG_LOAN_MONTHS_LEFT","Payments remaining"));
J.oLOAN_PAYMENT[G]=this.LOAN_PAYMENT[G]
}this.AUTO_CURRENT_BALANCE=new Array(this.AL_COUNT);
this.AUTO_PAYMENT=new Array(this.AL_COUNT);
this.AUTO_INTEREST_RATE=new Array(this.AL_COUNT);
this.AUTO_MONTHS_LEFT=new Array(this.AL_COUNT);
for(var G=0;
G<this.LN_COUNT;
G++){this.AUTO_CURRENT_BALANCE[G]=this.LOAN_CURRENT_BALANCE[G];
this.AUTO_PAYMENT[G]=this.LOAN_PAYMENT[G];
this.AUTO_INTEREST_RATE[G]=this.LOAN_INTEREST_RATE[G];
this.AUTO_MONTHS_LEFT[G]=this.LOAN_MONTHS_LEFT[G]
}this.OT_COUNT=this.LN_COUNT-this.AL_COUNT;
if(this.OT_COUNT<0){this.OT_COUNT=0
}this.OT_CURRENT_BALANCE=new Array(this.OT_COUNT);
this.OT_PAYMENT=new Array(this.OT_COUNT);
this.OT_INTEREST_RATE=new Array(this.OT_COUNT);
this.OT_MONTHS_LEFT=new Array(this.OT_COUNT);
for(var G=this.AL_COUNT;
G<this.LN_COUNT;
G++){this.OT_CURRENT_BALANCE[G-this.AL_COUNT]=this.LOAN_CURRENT_BALANCE[G];
this.OT_PAYMENT[G-this.AL_COUNT]=this.LOAN_PAYMENT[G];
this.OT_INTEREST_RATE[G-this.AL_COUNT]=this.LOAN_INTEREST_RATE[G];
this.OT_MONTHS_LEFT[G-this.AL_COUNT]=this.LOAN_MONTHS_LEFT[G]
}KJE.parameters.getSet("VISIBLE_COUNT2",2);
if(this.CC_COUNT>0){KJE.initializeMore(this,this.CC_COUNT,["CC_DIVIDER",this.CC_BALANCE,this.CC_RATE,this.CC_PAYMENT],[false,true,false,true])
}if(this.AL_COUNT>0){KJE.initializeMore(this,this.AL_COUNT,["AL_DIVIDER",this.AUTO_CURRENT_BALANCE,this.AUTO_INTEREST_RATE,this.AUTO_PAYMENT,this.AUTO_MONTHS_LEFT],[false,true,false,true,false])
}if(this.OT_COUNT>0){KJE.initializeMore(this,this.OT_COUNT,["OT_DIVIDER",this.OT_CURRENT_BALANCE,this.OT_INTEREST_RATE,this.OT_PAYMENT,this.OT_MONTHS_LEFT],[false,true,false,true,false])
}KJE.InputItem.AltHelpName=null;
if(!J.AMOUNT_ONLY){KJE.DollarSlider("NEW_LOAN_BALANCE","Loan balance",0,10000000,0,0,4);
KJE.Label("NEW_LOAN_BALANCE_SHOW","Loan balance");
KJE.LoanRateSlider("NEW_LOAN_RATE","New loan interest rate");
KJE.DollarSlider("NEW_LOAN_PAYMENT","Payment",0,100000,2,0,6);
KJE.DollarSlider("ACCELERATE_BALANCE","Amount",0,100000,2,0,7);
if(this.NEW_LOAN_TERM_DROPDOWN){KJE.DropBoxSlider("NEW_LOAN_TERM","Term",KJE.DebtCalculation.dTerm)
}else{if(J.MORTGAGE_CONSOLIDATE&&J.USE_LOAN_TYPE){KJE.DropBox("LOAN_TYPE_INDEX","Repayment term")
}else{KJE.DropBox("LOAN_TYPE_INDEX","Loan type");
KJE.NumberSlider("NEW_LOAN_TERM","Term in months",1,KJE.Default.MortgageTermMax*12)
}}}if(J.SHOW_TAXES){KJE.PercentSlider("INCOME_TAX_RATE","Tax rate",0,50,1,1)
}if(J.CALC_INVESTMENT){KJE.Label("NET_CASH","Net cash");
KJE.RateSlider("RETURN_PERCENT","Rate of return");
KJE.PercentSlider("INVESTMENT_PERCENT","Percent to invest",0,100,0,1);
KJE.DollarSlider("NEW_LOAN_FEES","Fees",0,10000,0);
this.MSG_GRAPH_COL1=KJE.parameters.get("MSG_GRAPH_COL1","Investment balance");
this.MSG_GRAPH_COL2=KJE.parameters.get("MSG_GRAPH_COL2","Loan balance")
}this.MSG_GRAPH3=KJE.parameters.get("MSG_GRAPH3","Loan Balances");
this.FOOTER1=null;
if(J.MORTGAGE_CONSOLIDATE){var y=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH1","Monthly Payment Comparison"));
y._showItemLabel=true;
y._showItemLabelOnTop=true;
y._legend._iOrientation=l.TOP_RIGHT;
this.FOOTER1=KJE.addDiv("FOOTER1",KJE.colorList[1])
}else{if(J.AMOUNT_ONLY){var y=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH1","Time to pay off debt is KJE1."));
y._iArea=KJE.gGraphLine.AREA_FIRST_ONLY;
y._legend.setVisible(false)
}else{if(J.CALC_INVESTMENT){var y=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH1","Consolidated Loan and Investment Balances"));
y._iArea=KJE.gGraphLine.AREA_FIRST_ONLY;
y._legend._iOrientation=l.TOP_RIGHT
}else{this.SHOW_INTEREST_GRAPH=KJE.parameters.get("SHOW_INTEREST_GRAPH",false);
var y=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH1",this.SHOW_INTEREST_GRAPH?"Total Interest Paid":"Time to Pay Off Debt"));
y._showItemLabel=true;
y._showItemLabelFmt=M.FMT_NUMBER;
y._showItemLabelOnTop=true;
y._axisY.setFormat(M.FMT_NUMBER);
y._legend._iOrientation=l.TOP_RIGHT;
var n=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH2",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH2","Monthly Payment Comparison"));
n._showItemLabel=true;
n._showItemLabelOnTop=true;
n._legend._iOrientation=l.TOP_RIGHT
}}}if(this.CC_COUNT>0){var R=KJE.parameters.get("MSG_CC_TITLE","Credit card debt:");
var P=KJE.parameters.get("MSG_CC_CLOSETITLE","KJE1");
var N=function(){return R+"|"+KJE.subText(KJE.getKJEReplaced(P,M.dollars(J.CC_OUTSTANDING_BALANCE)),"KJERightBold")
};
this.CC_Dropper=KJE.addDropper(new KJE.Dropper("CC",false,N,N),KJE.colorList[0]);
this.addMoreDropper(this.CC_Dropper)
}if(this.AL_COUNT>0){var Q=KJE.parameters.get("MSG_AUTO_TITLE","Auto loan debt:");
var E=KJE.parameters.get("MSG_AUTO_CLOSETITLE","KJE1");
var I=function(){return Q+"|"+KJE.subText(KJE.getKJEReplaced(E,M.dollars(J.AUTO_OUTSTANDING_BALANCE)),"KJERightBold")
};
this.AUTO_Dropper=KJE.addDropper(new KJE.Dropper("AUTO",false,I,I),KJE.colorList[0]);
this.addMoreDropper(this.AUTO_Dropper)
}if(this.OT_COUNT>0){var B=KJE.parameters.get("MSG_OTHER_TITLE","Other loans & installment debt:");
var L=KJE.parameters.get("MSG_OTHER_CLOSETITLE","KJE1");
var K=function(){return B+"|"+KJE.subText(KJE.getKJEReplaced(L,M.dollars(J.OTHER_OUTSTANDING_BALANCE)),"KJERightBold")
};
this.OTHER_Dropper=KJE.addDropper(new KJE.Dropper("OTHER",false,K,K),KJE.colorList[0]);
this.addMoreDropper(this.OTHER_Dropper)
}if(!J.AMOUNT_ONLY){var A=KJE.parameters.get("MSG_NEW_LOAN_TITLE","New consolidated loan:");
var D=KJE.parameters.get("MSG_NEW_LOAN_CLOSETITLE","KJE1");
var H=function(){return A+"|"+KJE.subText(KJE.getKJEReplaced(D,M.dollars(J.NEW_LOAN_BALANCE)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("NEW_LOAN",true,H,H),KJE.colorList[0]);
if(J.CALC_ACCEL){var C=KJE.parameters.get("MSG_ACCELERATE_TITLE","Apply monthly payment savings:");
var z=KJE.parameters.get("MSG_ACCELERATE_CLOSETITLE","KJE1");
var O=function(){return C+"|"+KJE.subText(KJE.getKJEReplaced(z,F.ACCELERATE_BALANCE.getFormatted()),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("ACCELERATE",true,C,O),KJE.colorList[0])
}}};
KJE.DebtConsolidate.prototype.setValues=function(h){var f=KJE.inputs.items;
var e=f.CC_USE_MINIMUM.getValue();
if(h.CC_USE_MINIMUM!=e){if(e){for(var g=0;
g<this.CC_COUNT;
g++){this.CC_PAYMENT[g].disable()
}h.CALC_CC_PAYMENT=true
}else{for(var g=0;
g<this.CC_COUNT;
g++){this.CC_PAYMENT[g].enable()
}h.CALC_CC_PAYMENT=false
}h.CC_USE_MINIMUM=f.CC_USE_MINIMUM.getValue()
}if(!h.AMOUNT_ONLY){h.NEW_LOAN_BALANCE=f.NEW_LOAN_BALANCE.getValue();
h.NEW_LOAN_RATE=f.NEW_LOAN_RATE.getValue();
h.NEW_LOAN_PAYMENT=f.NEW_LOAN_PAYMENT.getValue();
if(f.LOAN_TYPE_INDEX){h.LOAN_TYPE_INDEX=f.LOAN_TYPE_INDEX.getValue()
}if(h.MORTGAGE_CONSOLIDATE&&h.USE_LOAN_TYPE){h.FOOTER1=(KJE.parameters.get(KJE.DebtCalculation.dProductIO[h.LOAN_TYPE_INDEX]?"MSG_INTEREST_ONLY_TRUE":"MSG_INTEREST_ONLY_FALSE",""))
}else{h.NEW_LOAN_TERM=f.NEW_LOAN_TERM.getValue()
}h.ACCELERATE_BALANCE=f.ACCELERATE_BALANCE.getValue()
}else{h.NEW_LOAN_TERM=360;
h.OLD_OUTSTANDING_BALANCE=-1;
h.NEW_LOAN_BALANCE=5000
}for(var g=0;
g<this.CC_COUNT;
g++){h.CC_BALANCE[g]=this.CC_BALANCE[g].getValue();
h.CC_RATE[g]=this.CC_RATE[g].getValue();
h.CC_PAYMENT[g]=this.CC_PAYMENT[g].getValue()
}for(var g=0;
g<this.LN_COUNT;
g++){if(g<this.LN_COUNT){h.LOAN_PAYMENT[g]=this.LOAN_PAYMENT[g].getValue();
h.LOAN_CURRENT_BALANCE[g]=this.LOAN_CURRENT_BALANCE[g].getValue();
h.LOAN_INTEREST_RATE[g]=this.LOAN_INTEREST_RATE[g].getValue()
}}h.CALC_CC_PAYMENT=true;
if(h.SHOW_TAXES){h.INCOME_TAX_RATE=f.INCOME_TAX_RATE.getValue()
}if(h.CALC_INVESTMENT){h.NEW_LOAN_FEES=f.NEW_LOAN_FEES.getValue();
h.INVESTMENT_PERCENT=f.INVESTMENT_PERCENT.getValue();
h.RETURN_PERCENT=f.RETURN_PERCENT.getValue()
}};
KJE.DebtConsolidate.prototype.refresh=function(k){var l=KJE;
var m=KJE.gLegend;
var h=KJE.inputs.items;
var i=KJE.gGraphs[0];
KJE.setTitleTemplate(k.MSG_TITLE);
if(k.MORTGAGE_CONSOLIDATE){var i=KJE.gGraphs[0];
i.removeAll();
i.setGraphCategories(k.DS_PAYMENT_CATS);
i._sGraphCategoriesBold=k.DS_PAYMENTS_BLD;
i.add(new KJE.gGraphDataSeries(k.DS_PAYMENTS,this.MSG_GRAPH3,i.getColor(1)));
i.paint()
}else{if(k.AMOUNT_ONLY){i.removeAll();
i.add(new KJE.gGraphDataSeries(k.DS_BALANCE,k.CURRENT_PAYOFF,i.getColor(1)));
i.setGraphCategories(k.cats);
if(k.CURRENT_PAYOFF_MONTHS<=120){i._titleXAxis.setText(KJE.MSG_MONTH_LBL)
}else{i._titleXAxis.setText(KJE.MSG_YEAR_LBL)
}i.setTitleTemplate(k.CURRENT_PAYOFF);
i.paint()
}else{if(k.CALC_INVESTMENT){i.removeAll();
i.setGraphCategories(k.cats);
if(k.NEW_LOAN_TERM<120){i._titleXAxis.setText(KJE.MSG_MONTH_LBL)
}else{i._titleXAxis.setText(KJE.MSG_YEAR_LBL)
}i.add(new KJE.gGraphDataSeries(k.DS_INVEST_BALANCE,this.MSG_GRAPH_COL1,i.getColor(1)));
if(k.DS_ACCEL_BALANCE){i.add(new KJE.gGraphDataSeries(k.DS_ACCEL_BALANCE,this.MSG_GRAPH_COL2,i.getColor(2)))
}i.paint()
}else{i.removeAll();
i.setGraphCategories(k.DS_PAYMENT_CATS);
if(this.SHOW_INTEREST_GRAPH){i._sGraphCategoriesBold=k.DS_INTEREST_BLD;
i.add(new KJE.gGraphDataSeries(k.DS_INTEREST,k.DS_PAYMENT_CATS[0],i.getColor(1)))
}else{i._sGraphCategoriesBold=k.DS_MONTHS_BLD;
i.add(new KJE.gGraphDataSeries(k.DS_MONTHS,k.DS_PAYMENT_CATS[0],i.getColor(1)))
}i.paint();
var n=KJE.gGraphs[1];
n.removeAll();
n.setGraphCategories(k.DS_PAYMENT_CATS);
n._sGraphCategoriesBold=k.DS_PAYMENTS_BLD;
n.add(new KJE.gGraphDataSeries(k.DS_PAYMENTS,this.MSG_GRAPH3,n.getColor(1)));
n.paint()
}}}if(k.CC_USE_MINIMUM){for(var j=0;
j<this.CC_COUNT;
j++){this.CC_PAYMENT[j].setValue(k.CC_PAYMENT[j],true)
}}for(var j=0;
j<this.LN_COUNT;
j++){this.LOAN_MONTHS_LEFT[j].setText(k.LOAN_MONTHS_LEFT[j]?l.number(k.LOAN_MONTHS_LEFT[j]):"",true)
}if(!k.AMOUNT_ONLY){if(k.CALC_ACCEL){h.ACCELERATE_BALANCE.setValue(k.ACCELERATE_BALANCE,true)
}if(k.CALC_INVESTMENT){h.NET_CASH.setText(l.dollars(k.NET_CASH))
}h.NEW_LOAN_BALANCE.setValue(k.NEW_LOAN_BALANCE,true);
h.NEW_LOAN_RATE.setValue(k.NEW_LOAN_RATE,true);
h.NEW_LOAN_PAYMENT.setValue(k.NEW_LOAN_PAYMENT,true);
if(!this.NEW_LOAN_TERM_DROPDOWN){if(h.NEW_LOAN_TERM){h.NEW_LOAN_TERM.setValue(k.NEW_LOAN_TERM,true)
}}if(h.NEW_LOAN_BALANCE_SHOW){h.NEW_LOAN_BALANCE_SHOW.setText(l.dollars(k.NEW_LOAN_BALANCE))
}}if(this.FOOTER1!=null){this.FOOTER1.innerHTML=k.FOOTER1
}};
KJE.InputScreenText=" <div id=KJE-D-CC><div id=KJE-P-CC>Input information:</div></div> <div id=KJE-E-CC > <div id='KJE-C-CC_USE_MINIMUM'><input id='KJE-CC_USE_MINIMUM' type=checkbox name='CC_USE_MINIMUM' /></div> <hr class=KJEDivide /> <div id='KJE-C-CC_BALANCE1'><input id='KJE-CC_BALANCE1' /></div> <div id='KJE-C-CC_RATE1'><input id='KJE-CC_RATE1' /></div> <div id='KJE-C-CC_PAYMENT1'><input id='KJE-CC_PAYMENT1' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER1\" /> <div id='KJE-C-CC_BALANCE2'><input id='KJE-CC_BALANCE2' /></div> <div id='KJE-C-CC_RATE2'><input id='KJE-CC_RATE2' /></div> <div id='KJE-C-CC_PAYMENT2'><input id='KJE-CC_PAYMENT2' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER2\" /> <div id='KJE-C-CC_BALANCE3'><input id='KJE-CC_BALANCE3' /></div> <div id='KJE-C-CC_RATE3'><input id='KJE-CC_RATE3' /></div> <div id='KJE-C-CC_PAYMENT3'><input id='KJE-CC_PAYMENT3' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER3\" /> <div id='KJE-C-CC_BALANCE4'><input id='KJE-CC_BALANCE4' /></div> <div id='KJE-C-CC_RATE4'><input id='KJE-CC_RATE4' /></div> <div id='KJE-C-CC_PAYMENT4'><input id='KJE-CC_PAYMENT4' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER4\" /> <div id='KJE-C-CC_BALANCE5'><input id='KJE-CC_BALANCE5' /></div> <div id='KJE-C-CC_RATE5'><input id='KJE-CC_RATE5' /></div> <div id='KJE-C-CC_PAYMENT5'><input id='KJE-CC_PAYMENT5' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER5\" /> <div id='KJE-C-CC_BALANCE6'><input id='KJE-CC_BALANCE6' /></div> <div id='KJE-C-CC_RATE6'><input id='KJE-CC_RATE6' /></div> <div id='KJE-C-CC_PAYMENT6'><input id='KJE-CC_PAYMENT6' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER6\" /> <div id='KJE-C-CC_BALANCE7'><input id='KJE-CC_BALANCE7' /></div> <div id='KJE-C-CC_RATE7'><input id='KJE-CC_RATE7' /></div> <div id='KJE-C-CC_PAYMENT7'><input id='KJE-CC_PAYMENT7' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER7\" /> <div id='KJE-C-CC_BALANCE8'><input id='KJE-CC_BALANCE8' /></div> <div id='KJE-C-CC_RATE8'><input id='KJE-CC_RATE8' /></div> <div id='KJE-C-CC_PAYMENT8'><input id='KJE-CC_PAYMENT8' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER8\" /> <div id='KJE-C-CC_BALANCE9'><input id='KJE-CC_BALANCE9' /></div> <div id='KJE-C-CC_RATE9'><input id='KJE-CC_RATE9' /></div> <div id='KJE-C-CC_PAYMENT9'><input id='KJE-CC_PAYMENT9' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER9\" /> <div id='KJE-C-CC_BALANCE10'><input id='KJE-CC_BALANCE10' /></div> <div id='KJE-C-CC_RATE10'><input id='KJE-CC_RATE10' /></div> <div id='KJE-C-CC_PAYMENT10'><input id='KJE-CC_PAYMENT10' /></div> <hr class=KJEDivide id=\"KJE-CC_DIVIDER10\" /> **MORE_BUTTONS** </div> <div id=KJE-D-AUTO><div id=KJE-P-AUTO>Input information:</div></div> <div id=KJE-E-AUTO > <div id='KJE-C-LOAN_CURRENT_BALANCE1'><input id='KJE-LOAN_CURRENT_BALANCE1' /></div> <div id='KJE-C-LOAN_INTEREST_RATE1'><input id='KJE-LOAN_INTEREST_RATE1' /></div> <div id='KJE-C-LOAN_PAYMENT1'><input id='KJE-LOAN_PAYMENT1' /></div> <div id='KJE-C-LOAN_MONTHS_LEFT1'><div id='KJE-LOAN_MONTHS_LEFT1' ></div></div> <hr class=KJEDivide id=\"KJE-AL_DIVIDER1\" /> <div id='KJE-C-LOAN_CURRENT_BALANCE2'><input id='KJE-LOAN_CURRENT_BALANCE2' /></div> <div id='KJE-C-LOAN_INTEREST_RATE2'><input id='KJE-LOAN_INTEREST_RATE2' /></div> <div id='KJE-C-LOAN_PAYMENT2'><input id='KJE-LOAN_PAYMENT2' ></div> <div id='KJE-C-LOAN_MONTHS_LEFT2'><div id='KJE-LOAN_MONTHS_LEFT2' ></div></div> <hr class=KJEDivide id=\"KJE-AL_DIVIDER2\" /> <div id='KJE-C-LOAN_CURRENT_BALANCE3'><input id='KJE-LOAN_CURRENT_BALANCE3' /></div> <div id='KJE-C-LOAN_INTEREST_RATE3'><input id='KJE-LOAN_INTEREST_RATE3' /></div> <div id='KJE-C-LOAN_PAYMENT3'><input id='KJE-LOAN_PAYMENT3' /></div> <div id='KJE-C-LOAN_MONTHS_LEFT3'><div id='KJE-LOAN_MONTHS_LEFT3' ></div></div> <hr class=KJEDivide id=\"KJE-AL_DIVIDER3\" /> **MORE_BUTTONS** </div> <div id=KJE-D-OTHER><div id=KJE-P-OTHER>Input information:</div></div> <div id=KJE-E-OTHER > <div id='KJE-C-LOAN_CURRENT_BALANCE4'><input id='KJE-LOAN_CURRENT_BALANCE4' /></div> <div id='KJE-C-LOAN_INTEREST_RATE4'><input id='KJE-LOAN_INTEREST_RATE4' /></div> <div id='KJE-C-LOAN_PAYMENT4'><input id='KJE-LOAN_PAYMENT4' /></div> <div id='KJE-C-LOAN_MONTHS_LEFT4'><div id='KJE-LOAN_MONTHS_LEFT4' ></div></div> <hr class=KJEDivide id=\"KJE-OT_DIVIDER1\" /> <div id='KJE-C-LOAN_CURRENT_BALANCE5'><input id='KJE-LOAN_CURRENT_BALANCE5' /></div> <div id='KJE-C-LOAN_INTEREST_RATE5'><input id='KJE-LOAN_INTEREST_RATE5' /></div> <div id='KJE-C-LOAN_PAYMENT5'><input id='KJE-LOAN_PAYMENT5' /></div> <div id='KJE-C-LOAN_MONTHS_LEFT5'><div id='KJE-LOAN_MONTHS_LEFT5' ></div></div> <hr class=KJEDivide id=\"KJE-OT_DIVIDER2\" /> <div id='KJE-C-LOAN_CURRENT_BALANCE6'><input id='KJE-LOAN_CURRENT_BALANCE6' /></div> <div id='KJE-C-LOAN_INTEREST_RATE6'><input id='KJE-LOAN_INTEREST_RATE6' /></div> <div id='KJE-C-LOAN_PAYMENT6'><input id='KJE-LOAN_PAYMENT6' /></div> <div id='KJE-C-LOAN_MONTHS_LEFT6'><div id='KJE-LOAN_MONTHS_LEFT6' ></div></div> <hr class=KJEDivide id=\"KJE-OT_DIVIDER3\" /> <div id='KJE-C-LOAN_CURRENT_BALANCE7'><input id='KJE-LOAN_CURRENT_BALANCE7' /></div> <div id='KJE-C-LOAN_INTEREST_RATE7'><input id='KJE-LOAN_INTEREST_RATE7' /></div> <div id='KJE-C-LOAN_PAYMENT7'><input id='KJE-LOAN_PAYMENT7' /></div> <div id='KJE-C-LOAN_MONTHS_LEFT7'><div id='KJE-LOAN_MONTHS_LEFT7' ></div></div> <hr class=KJEDivide id=\"KJE-OT_DIVIDER4\" /> <div id='KJE-C-LOAN_CURRENT_BALANCE8'><input id='KJE-LOAN_CURRENT_BALANCE8' /></div> <div id='KJE-C-LOAN_INTEREST_RATE8'><input id='KJE-LOAN_INTEREST_RATE8' /></div> <div id='KJE-C-LOAN_PAYMENT8'><input id='KJE-LOAN_PAYMENT8' /></div> <div id='KJE-C-LOAN_MONTHS_LEFT8'><div id='KJE-LOAN_MONTHS_LEFT8' ></div></div> <hr class=KJEDivide id=\"KJE-OT_DIVIDER5\" /> <div id='KJE-C-LOAN_CURRENT_BALANCE9'><input id='KJE-LOAN_CURRENT_BALANCE9' /></div> <div id='KJE-C-LOAN_INTEREST_RATE9'><input id='KJE-LOAN_INTEREST_RATE9' /></div> <div id='KJE-C-LOAN_PAYMENT9'><input id='KJE-LOAN_PAYMENT9' /></div> <div id='KJE-C-LOAN_MONTHS_LEFT9'><div id='KJE-LOAN_MONTHS_LEFT9' ></div></div> <hr class=KJEDivide id=\"KJE-OT_DIVIDER6\" /> **MORE_BUTTONS** </div> <div id=KJE-D-NEW_LOAN><div id=KJE-P-NEW_LOAN>Input information:</div></div> <div id=KJE-E-NEW_LOAN > <div id='KJE-C-NEW_LOAN_BALANCE'><input id='KJE-NEW_LOAN_BALANCE' /></div> <div id='KJE-C-NEW_LOAN_PAYMENT'><input id='KJE-NEW_LOAN_PAYMENT' /></div> <div id='KJE-C-NEW_LOAN_RATE'><input id='KJE-NEW_LOAN_RATE' /></div> <div id='KJE-C-NEW_LOAN_TERM'>**NEW_LOAN_TERM**</div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-ACCELERATE><div id=KJE-P-ACCELERATE>Input information:</div></div> <div id=KJE-E-ACCELERATE > <div id='KJE-C-ACCELERATE_BALANCE'><input id='KJE-ACCELERATE_BALANCE' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** **GRAPH2** ";
KJE.DefinitionText=" <div id='KJE-D-NEW_LOAN_BALANCE' ><dt>New loan balance</dt><dd>The amount for your new consolidation loan. The default amount will be the total of all of your debts. You can increase or decrease this amount if you need to change the total amount of the loan.</dd></div> <div id='KJE-D-NEW_LOAN_PAYMENT' ><dt>New loan payment</dt><dd>The monthly payment for your new consolidation loan.</dd></div> <div id='KJE-D-NEW_LOAN_RATE' ><dt>New loan interest rate</dt><dd>The Annual Percentage Rate (APR) that you will pay on your new consolidation loan.</dd></div> <div id='KJE-D-NEW_LOAN_TERM' ><dt>New loan term</dt><dd>The term, in months, for your new consolidation loan.</dd></div> <div id='KJE-D-CC_USE_MINIMUM' ><dt>Use minimum payment</dt><dd>If you checked the &quot;use credit card minimum payments&quot; box, your monthly payment is calculated as 4% of your current outstanding balance. With the &quot;use credit card minimum payments&quot; box checked, your monthly payment will decrease as your balance is paid down. This can greatly increase the length of time it takes to pay off your credit cards. Uncheck this box to enter your own monthly payment that will remain the same until your balance is paid in full. <p>(The tool calculates your minimum monthly payment as 4% of your current outstanding balance. While your actual minimum monthly payment may be slightly different, this is one of the most common methods used by credit card companies to calculate minimum payments.)</dd></div> <div id='KJE-D-CC_BALANCE' ><dt>Credit card Balance</dt><dd>Your total current balance for this credit card.</dd></div> <div id='KJE-D-CC_RATE' ><dt>Credit card Interest rate</dt><dd>The annual percentage rate you pay for this credit card. The rate you enter is used to calculate the interest on all future credit card payments. The length of time to pay off this credit card may be much greater than calculated if you enter a low promotional interest rate that is only good for a short period of time.</dd></div> <div id='KJE-D-CC_PAYMENT' ><dt>Credit card Payment</dt><dd>This is your initial monthly payment. If you checked the &quot;use credit card minimum payments&quot; box, your monthly payment is calculated as 4% of your current outstanding balance. With the &quot;use credit card minimum payments&quot; box checked, your monthly payment will decrease as your balance is paid down. This can greatly increase the length of time it takes to pay off your credit cards. Uncheck this box to enter your own monthly payment that will remain the same until your balance is paid in full. <p>(The tool calculates your minimum monthly payment as 4% of your current outstanding balance. While your actual minimum monthly payment may be slightly different, this is one of the most common methods used by credit card companies to calculate minimum payments.)</dd></div> <div id='KJE-D-LOAN_CURRENT_BALANCE' ><dt>Loan balance</dt><dd>Your total current balances for an installment loan.</dd></div> <div id='KJE-D-LOAN_INTEREST_RATE' ><dt>Loan interest rates</dt><dd>The annual percentage rate you pay for this loan. Enter the current interest rate for this loan. This calculator assumes your rate will remain the same for the entire repayment period. The tool uses this to calculate the interest you will pay on this loan and the number of payments that are remaining.</dd></div> <div id='KJE-D-LOAN_PAYMENT' ><dt>Loan payment</dt><dd>This is your monthly payment. Enter the actual monthly payment for your loan, tool uses this to determine your payment totals and to calculate the remaining payments.</dd></div> <div id='KJE-D-LOAN_MONTHS_LEFT' ><dt>Remaining loan payments</dt><dd>This is the calculated number of payments remaining for this loan. It is based on your current balance, payment and interest rate.</dd></div> <div id='KJE-D-ACCELERATE_BALANCE' ><dt>Apply monthly payment savings amount</dt><dd>This is an additional amount you wish to pay each month, to more quickly pay off your debt. This amount is added to your normal consolidated loan payment.</dd></div> ";
KJE.ReportText=' <!--HEADING "Accelerated Debt Payoff" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>MSG_TITLE</h2> With a new consolidated loan of NEW_LOAN_BALANCE your monthly payment would be NEW_LOAN_PAYMENT. If you accelerate your payments by ACCELERATE_BALANCE per month you could payoff your debt in ACCEL_PAYOFF. Your accelerated payment plan would amount to MSG_INTEREST_SAVINGS in interest paid on your debt.<p> **GRAPH** **GRAPH** <div class=KJEReportTableDiv><table class=\'KJEReportTable KJEReportTableShrink\'><caption class=\'KJEHeaderRow KJEHeading\'>Result Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><td class="KJEHeading KJECell40">&nbsp;</td><th class="KJEHeading KJECell20" scope=\'col\'>Current Debt</th><th class="KJEHeading KJECell20" scope=\'col\'>Consolidation Loan</th><th class="KJEHeading KJECell20" scope=\'col\'>Accelerated Loan</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan amount </th><td class="KJECell KJECellBorder">OUTSTANDING_BALANCE </td><td class="KJECell KJECellBorder">NEW_LOAN_BALANCE </td><td class="KJECell">NEW_LOAN_BALANCE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Monthly payment </th><td class="KJECell KJECellBorder">MONTHLY_PAYMENT </td><td class="KJECell KJECellBorder">NEW_LOAN_PAYMENT </td><td class="KJECell">ACC_LOAN_PAYMENT </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate </th><td class="KJECell KJECellBorder">AVERAGE_RATE </td><td class="KJECell KJECellBorder">NEW_LOAN_RATE </td><td class="KJECell">NEW_LOAN_RATE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest </th><td class="KJECell KJECellBorder">INTEREST_CURRENT</td><td class="KJECell KJECellBorder">INTEREST_NEW</td><td class="KJECell"> INTEREST_ACCEL</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest difference </th><td class="KJELabel KJECellBorder">$0</td><td class="KJELabel KJECellBorder">MSG_NEW_INTEREST_SAVINGS</td><td class="KJELabel"> MSG_INTEREST_SAVINGS</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Time to pay off </th><td class="KJELabel KJECellBorder">CURRENT_PAYOFF </td><td class="KJELabel KJECellBorder">NEW_PAYOFF</td><td class="KJELabel"> ACCEL_PAYOFF!</td></tr> </tfoot> </table> </div> <h2 class=\'KJEReportHeader KJEFontHeading\'>Current Loans and Credit Cards</h2>The total of all current loan payments is MONTHLY_PAYMENT. This is based on the loans and payment information shown below. <div class=KJEReportTableDiv><table class=\'KJEReportTable KJEReportTableShrink\'><caption class=\'KJEHeaderRow KJEHeading\'>Current Loans</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class="KJEHeading KJECell40">&nbsp; </th><th class="KJEHeading KJECell20" scope=\'col\'>Amount Owed</th><th class="KJEHeading KJECell20" scope=\'col\'>Monthly Payment</th><th class="KJEHeading KJECell20" scope=\'col\'>Interest Rate</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Credit cards</th><td class="KJECell KJECellBorder">CC_OUTSTANDING_BALANCE</td><td class="KJECell KJECellBorder">CC_MONTHLY_PAYMENT</td><td class="KJECell">CC_AVERAGE_RATE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Auto loans</th><td class="KJECell KJECellBorder">AUTO_OUTSTANDING_BALANCE</td><td class="KJECell KJECellBorder">AUTO_MONTHLY_PAYMENT</td><td class="KJECell">AUTO_AVERAGE_RATE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Other loans</th><td class="KJECell KJECellBorder">OTHER_OUTSTANDING_BALANCE</td><td class="KJECell KJECellBorder">OTHER_MONTHLY_PAYMENT</td><td class="KJECell">OTHER_AVERAGE_RATE</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Totals</th><td class="KJELabel KJECellBorder">OUTSTANDING_BALANCE</td><td class="KJELabel KJECellBorder">MONTHLY_PAYMENT</td><td class="KJELabel">AVERAGE_RATE</td></tr> </tfoot> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Consolidated and Accelerated Loan Payment Schedule</h2> **REPEATING GROUP** ';
KJE.parameters.set("ACCELERATE_BALANCE",0);
KJE.parameters.set("CC_BALANCE1",0);
KJE.parameters.set("CC_BALANCE10",0);
KJE.parameters.set("CC_BALANCE2",0);
KJE.parameters.set("CC_BALANCE3",0);
KJE.parameters.set("CC_BALANCE4",0);
KJE.parameters.set("CC_BALANCE5",0);
KJE.parameters.set("CC_BALANCE6",0);
KJE.parameters.set("CC_BALANCE7",0);
KJE.parameters.set("CC_BALANCE8",0);
KJE.parameters.set("CC_BALANCE9",0);
KJE.parameters.set("CC_PAYMENT1",0);
KJE.parameters.set("CC_PAYMENT10",0);
KJE.parameters.set("CC_PAYMENT2",0);
KJE.parameters.set("CC_PAYMENT3",0);
KJE.parameters.set("CC_PAYMENT4",0);
KJE.parameters.set("CC_PAYMENT5",0);
KJE.parameters.set("CC_PAYMENT6",0);
KJE.parameters.set("CC_PAYMENT7",0);
KJE.parameters.set("CC_PAYMENT8",0);
KJE.parameters.set("CC_PAYMENT9",0);
KJE.parameters.set("CC_RATE1",0);
KJE.parameters.set("CC_RATE10",0);
KJE.parameters.set("CC_RATE2",0);
KJE.parameters.set("CC_RATE3",0);
KJE.parameters.set("CC_RATE4",0);
KJE.parameters.set("CC_RATE5",0);
KJE.parameters.set("CC_RATE6",0);
KJE.parameters.set("CC_RATE7",0);
KJE.parameters.set("CC_RATE8",0);
KJE.parameters.set("CC_RATE9",0);
KJE.parameters.set("NEW_LOAN_BALANCE",0);
KJE.parameters.set("NEW_LOAN_RATE",KJE.Default.RatePersonal);
KJE.parameters.set("NEW_LOAN_TERM",120);
KJE.parameters.set("CALC_ACCEL",true);
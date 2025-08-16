KJE.MortgageLoanCalculation=function(){this.MSG_ERROR_MAPR=KJE.parameters.get("","KJE1 MAPR exceeds allowable maximum of 36%, adjust fees to reduce the calculated MAPR.");
this.bMAPR=KJE.parameters.get("USE_MAPR",false);
this.bTERMINMONTHS=KJE.parameters.get("TERM_IN_MONTHS",false);
this.MSG_YEAR_NUMBER=KJE.parameters.get("MSG_YEAR_NUMBER","Year Number");
this.MSG_POP_PRINCIPAL=KJE.parameters.get("MSG_POP_PRINCIPAL","Total Principal for");
this.MSG_POP_INTEREST=KJE.parameters.get("MSG_POP_INTEREST","Total Interest for");
this.MSG_PRINCIPAL=KJE.parameters.get("MSG_PRINCIPAL","Principal");
this.MSG_INTEREST=KJE.parameters.get("MSG_INTEREST","Interest");
this.MSG_PRINCIPAL_BALANCE=KJE.parameters.get("MSG_PRINCIPAL_BALANCE","Principal Balance");
this.MSG_POP_PRINCIPAL_NORMAL=KJE.parameters.get("MSG_POP_PRINCIPAL_NORMAL","Principal Balance for Normal Payments Year");
this.MSG_POP_PRINCIPAL_PREPAY=KJE.parameters.get("MSG_POP_PRINCIPAL_PREPAY","Principal Balance for Prepayments Year");
this.MSG_PREPAYMENTS=KJE.parameters.get("MSG_PREPAYMENTS","Prepayments");
this.MSG_NORMAL_PAYMENTS=KJE.parameters.get("MSG_NORMAL_PAYMENTS","Normal");
this.MSG_PREPAY_MESSAGE=KJE.parameters.get("MSG_PREPAY_MESSAGE","Your planned prepayment(s) will shorten your mortgage by PREPAY_SHORTEN_TERM.");
this.MSG_RETURN_PAYMENT=KJE.parameters.get("MSG_RETURN_PAYMENT","A loan amount of LOAN_AMOUNT at INTEREST_RATE for TERM years will give you a monthly payment (PI) of MONTHLY_PI.");
this.MSG_ERROR_BALLOON=KJE.parameters.get("MSG_ERROR_BALLOON","Loan term must be less than the amortization term.");
this.PITI_PERCENT=KJE.parameters.get("PITI_PERCENT",false);
this.SHOW_PITI=KJE.parameters.get("SHOW_PITI",false);
this.USE_OTHER_FEES_AMOUNT=KJE.parameters.get("USE_OTHER_FEES_AMOUNT",true);
this.ADJUSTABLE_RATE=false;
this.PMI_CALCULATE=KJE.parameters.get("PMI_CALCULATE",false);
this.PMI_RATE=KJE.parameters.get("PMI_RATE",0.5);
this.MONTHLY_PMI=KJE.parameters.getSet("MONTHLY_PMI",0);
this.PMI_PERCENTAGE=KJE.parameters.get("PMI_PERCENTAGE",0.2);
this.oldLOAN_AMOUNT=0;
this.oldDOWNPAYMENT_20=0;
this.OTHER_FEES_MAPR=KJE.FloatArray(5);
this.sSchedule=new KJE.Repeating();
this.sAdjSchedule=null
};
KJE.MortgageLoanCalculation.prototype.clear=function(){for(var b=0;
b<this.OTHER_FEES_MAPR.length;
b++){this.OTHER_FEES_MAPR[b]=0
}this.ADJUSTABLE_RATE_CAP=0;
this.ADJUSTABLE_RATE_FEQ=12;
this.ADJUSTABLE_RATE_FIXED=0;
this.ADJUSTABLE_RATE_INCR=0;
this.BALLOON_PAYMENT=0;
this.DISCOUNT_POINTS_PERCENT=0;
this.FEDERAL_TAX_RATE=0;
this.INFLATION_RATE=3;
this.INTEREST_ONLY=false;
this.INTEREST_RATE=0;
this.LOAN_AMOUNT=0;
this.MARGINAL_TAX_RATE=0;
this.MSG_TERM="";
this.ORIGINATION_FEES_PERCENT=0;
this.OTHER_FEES=0;
this.OTHER_FEES_RATE=0;
this.PREPAY_AMOUNT=0;
this.PREPAY_BALLOON_PAYMENT=0;
this.PREPAY_STARTS_WITH=1;
this.PREPAY_TYPE=KJE.Default.PREPAY_NONE;
this.PURCHASE_PRICE=0;
this.DOWNPAYMENT=0;
this.RATE_INDEX=0;
this.RATE_INDEX_MARGIN=0;
this.RECAST_TO_AMORTIZE=1000000;
this.SAVINGS_RATE=0;
this.STATE_TAX_RATE=0;
this.TERM=0;
this.TERM_BALLOON=0;
this.YEARS_IN_HOME=0;
this.YEARLY_HOME_INSURANCE=0;
this.YEARLY_PROPERTY_TAXES=0;
this.MONTHLY_HOME_ASSOCIATION=0;
this.BY_YEAR=true
};
KJE.MortgageLoanCalculation.prototype.calculate=function(bG){var di=KJE;
var b8=this.ADJUSTABLE_RATE_CAP;
var db=this.ADJUSTABLE_RATE_FEQ;
var bC=this.ADJUSTABLE_RATE_FIXED;
var co=this.ADJUSTABLE_RATE_INCR;
var bQ=this.ADJUSTABLE_RATE;
var df=this.BALLOON_PAYMENT;
var bX=this.bTERMINMONTHS;
var b4=this.DISCOUNT_POINTS_PERCENT;
var c3=this.FEDERAL_TAX_RATE;
var cD=this.INFLATION_RATE;
var cW=this.INTEREST_ONLY;
var dy=this.INTEREST_RATE;
var dt=this.LOAN_AMOUNT;
var ck=this.MARGINAL_TAX_RATE;
var cF=this.ORIGINATION_FEES_PERCENT;
var cm=this.OTHER_FEES_RATE;
var b2=this.OTHER_FEES;
var dv=this.OTHER_FEES_MAPR;
var ci=this.PREPAY_AMOUNT;
var bM=this.PREPAY_BALLOON_PAYMENT;
var ch=this.PREPAY_STARTS_WITH;
var a0=this.PREPAY_TYPE;
var cV=this.PURCHASE_PRICE;
var ds=this.DOWNPAYMENT;
var dn=this.RATE_INDEX_MARGIN;
var bz=this.RATE_INDEX;
var de=this.RECAST_TO_AMORTIZE;
var bE=this.SAVINGS_RATE;
var b0=this.STATE_TAX_RATE;
var cx=this.TERM_BALLOON;
var b6=this.TERM;
var ct=this.YEARLY_HOME_INSURANCE;
var dk=this.YEARLY_PROPERTY_TAXES;
var cQ=this.YEARS_IN_HOME;
var cO=this.BY_YEAR;
var cn="";
var ce=0;
var bF="";
var cl=0;
var b1=0;
var cA=0;
var bA=0;
var cS=0;
var dp=0;
var b9=0;
var da=0;
var cP=0;
var c7=0;
var cj=0;
var bD=0;
var bB=0;
var ca=this.MONTHLY_PMI;
var bI=0;
var dh=0;
var b7;
var bJ=0;
var cg=0;
var dz=0;
var bU="";
var cT=0;
var c6=0;
var b3=0;
var cB=0;
var dr=0;
var cf=0;
var b5=0;
var bK=0;
var cv=0;
var bZ=0;
var cc=0;
var bO=0;
var cd=0;
var cb=0;
var cU=0;
var bH=0;
var c4=KJE.Default.MORTGAGE_TAX_DEDUCT_MAX_BALANCE;
var ds=this.DOWNPAYMENT;
var cV=this.PURCHASE_PRICE;
if(cV==0&&!this.PMI_CALCULATE){cV=dt
}else{dt=cV-ds;
if(dt<0){dt=0
}}if(this.PITI_PERCENT&&this.SHOW_PITI){this.YEARLY_PROPERTY_TAXES=di.round((this.YEARLY_PROPERTY_TAXES/100)*cV);
this.YEARLY_HOME_INSURANCE=di.round((this.YEARLY_HOME_INSURANCE/100)*cV)
}var du=cV*this.PMI_PERCENTAGE;
if(this.PMI_CALCULATE&&(du!=this.oldDOWNPAYMENT_20||dt!=this.oldLOAN_AMOUNT)){if(du>ds){ca=dt*(this.PMI_RATE/1200)
}else{ca=0
}}this.oldLOAN_AMOUNT=dt;
this.oldDOWNPAYMENT_20=du;
if(bX){this.MONTHS=cU=b6%12;
this.TERM=b6=Math.floor(b6/12)
}var r=this.TOTAL_MONTHS=cU+b6*12;
if(ck==0){ck=((b0/100)*(1-c3/100))*100+c3
}if(cW){bD=di.round((dy/1200*dt),2)
}else{bD=di.round(KJE.PMT(dy/1200,b6*12+cU,dt),2)
}cn=this.MSG_RETURN_PAYMENT;
if(cQ==0){cQ=b6+(cU/12)
}else{if(cQ>b6){cQ=b6+(cU/12)
}}var cr=cQ*12;
if(!this.USE_OTHER_FEES_AMOUNT){b2=di.round((cm/100)*dt,2)
}cA=di.round((b4/100)*dt,2);
dh=di.round((cF/100)*dt,2);
bK=cA+dh+b2;
var cE=0;
for(var dq=0;
dq<dv.length;
dq++){cE+=dv[dq]
}bK+=cE;
c7=(dt/cV);
cj=di.round(ct/12,2);
bI=di.round(dk/12,2);
MONTHLY_HOME_ASSOCIATION=this.MONTHLY_HOME_ASSOCIATION;
bB=cj+bI+MONTHLY_HOME_ASSOCIATION+bD+ca;
cS=di.round((dy/1200)*dt,2);
dp=(cW?0:bD-cS);
var bx=dy/1200;
var c8=ck/100;
var cG=bE/1200;
bH=(bz+dn)/100;
if(bQ&&bH!=dy/100&&bH!=0){if(dt<=0){bZ=0
}else{bZ=KJE.MortgageLoanCalculation.APRAdjustable(b6*12+cU,dt-(!this.bMAPR?0:bK),bK,dy/100,bC,db,bH,co/100,b8)
}}else{if(dt<=0){bZ=0
}else{bZ=KJE.APR(b6*12+cU,bD,bx,dt-(!this.bMAPR?0:bK),bK)*12
}}cc=di.round(KJE.PMT(bx,b6*12+cU,dt+(this.bMAPR?0:bK)),2);
bO=dt+(this.bMAPR?0:bK);
b5=(dy/100)*(1-(c8*(dt>c4?c4/dt:1)));
cd=(bZ)*(1-(c8*(dt>c4?c4/dt:1)));
cv=0;
cP=0;
var cs=false;
if(cx>0){if(cx>b6){throw this.MSG_ERROR_BALLOON
}cs=true
}if(cW&&de<cx){cx=b6;
cs=true
}var dl=Math.round(cs?cx:b6)+1;
var dq=0;
var dg=this.DS_PRINCIPAL_BAL=KJE.FloatArray(dl);
var dm=this.DS_PREPAY_PRINCIPAL_BAL=KJE.FloatArray(dl);
var c1=this.DS_INTEREST_PAID=KJE.FloatArray(dl);
var dw=this.DS_PAYMENTS=KJE.FloatArray(dl);
var q=new Array(dl);
var s=true;
var n=dk;
cB=(a0==KJE.Default.PREPAY_ONETIME&&ch==0?ci:0);
var bV=dt-cB;
var c2=0;
var dj=0;
var bN=0;
var cz=0;
var cI=0;
var c0=(cW?cS:bD);
var bY=0;
var cq=0;
var c9=dt;
var cy=0;
var cJ=0;
var cH=0;
var bL=0;
var cp=0;
var cZ=bD;
var dx=0;
var bS=0;
var bW=0;
var by=0;
var cY=0;
var bP=0;
if(a0==KJE.Default.PREPAY_NONE){s=false
}if(ch==0&&a0!=KJE.Default.PREPAY_ONETIME){ch=1
}var cK=0;
q[cK]="0";
dm[cK]=bV;
dg[cK]=dt;
c1[cK]=0;
dw[cK]=0;
cK+=1;
if(bG){var cN=this.sSchedule;
cN.clearRepeat();
if(s){cN.addHeader("&nbsp;",{sCell:KJE._sHeadingUnderline,sContent:cN.sReportCol("Regular Payment Schedule",10),sFormat:"COLSPAN=3"},{sCell:KJE._sHeadingUnderline,sContent:cN.sReportCol("Prepayment Payment Schedule",11),sFormat:"COLSPAN=3"})
}if(!cO&&s){cN.addHeader(cN.sReportCol("<BR><BR>Nbr",1),cN.sReportCol("<BR><BR>Payment",2),cN.sReportCol("<BR><BR>Interest",4),cN.sReportCol("Ending<BR>Principal<BR>Balance",5),cN.sReportCol("<BR><BR>Payment",2),cN.sReportCol("<BR><BR>Interest",4),cN.sReportCol("Ending<BR>Principal<BR>Balance",5))
}else{if(!cO&&!s){cN.addHeader(cN.sReportCol("<BR><BR>Nbr",1),cN.sReportCol("<BR><BR>Payment",2),cN.sReportCol("<BR><BR>Principal",3),cN.sReportCol("<BR><BR>Interest",4),cN.sReportCol("Ending<BR>Principal<BR>Balance",5))
}else{if(cO&&s){cN.addHeader(cN.sReportCol("<BR><BR>Yr ",6),cN.sReportCol("<BR>Total<BR>Payments",7),cN.sReportCol("<BR>Interest<BR>Paid",8),cN.sReportCol("Ending<BR>Principal<BR>Balance",5),cN.sReportCol("<BR>Total<BR>Payments",7),cN.sReportCol("<BR>Interest<BR>Paid",8),cN.sReportCol("Ending<BR>Principal<BR>Balance",5))
}else{cN.addHeader(cN.sReportCol("<BR><BR>Year",6),cN.sReportCol("<BR>Total<BR>Payments",7),cN.sReportCol("<BR>Principal<BR>Paid",9),cN.sReportCol("<BR>Interest<BR>Paid",8),cN.sReportCol("Ending<BR>Principal<BR>Balance",5))
}}}if(s){cN.addRepeat("&nbsp;","&nbsp;","&nbsp;",di.dollars(c9,2),(a0==KJE.Default.PREPAY_ONETIME&&ch==0?di.dollars(ci,2):""),"&nbsp;","&nbsp;",di.dollars(bV,2))
}else{cN.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",di.dollars(c9,2))
}}cl=bD;
var dc=bD;
var cX=bD;
var bT=dy/100;
var cL=dy/100;
var c5=0;
if(bQ&&co!=0){if(this.sAdjSchedule==null){this.sAdjSchedule=new KJE.Repeating()
}var cu=this.sAdjSchedule;
cu.clearRepeat();
cu.addHeader(cu.sReportCol("Payment Number",12),cu.sReportCol("Interest Rate",13),cu.sReportCol("Monthly Payment",14));
cu.addRepeat("1",di.percent(cL,2),di.dollars(bD,2))
}var cw=(cs?cx*12:b6*12+cU);
for(var cC=1;
cC<=cw;
cC++){dq=cC-1;
c0=dc;
cZ=cX;
bY=0;
dx=0;
if(s&&(ch<=cC)){if(a0==KJE.Default.PREPAY_ONETIME&&ch==cC){bY=ci
}else{if(a0==KJE.Default.PREPAY_YEARLY){if(((cC-ch)%12)==0){bY=ci
}}else{if(a0==KJE.Default.PREPAY_MONTHLY){bY=ci
}}}}cy=di.round(bx*c9,2);
if(cW&&cC<=de){cZ=cy
}bW=di.round(bx*(c9>c4?c4:c9),2);
cJ=(cW&&cC<de?0:cZ-cy);
c9-=cJ;
if(c9==0){cZ=0;
cJ=0;
cy=0
}else{if(c9<0||(c9>0.005&&cw==cC&&!cs)){cJ+=c9;
c9=0;
cZ=cJ+cy
}else{if(cw==cC&&!cs){c9=0
}}}c2=di.round(bx*bV,2);
if(cW&&cC<=de){c0=c2
}by=di.round(bx*(bV>c4?c4:bV),2);
if(cW&&cC<de){if(bV==0){c0=0;
dj=0;
c2=0;
bY=0
}else{dj=c0-c2;
bV-=dj+bY;
if(bV<0){bY+=bV;
bV=0
}}}else{dj=c0-c2;
bV-=dj+bY;
if(bV==0){c0=0;
dj=0;
c2=0;
bY=0
}else{if(bV<0){bY+=bV;
if(bY<0){dj+=bY;
bY=0
}bV=0;
c0=dj+c2
}else{if(bV>0.005&&cw==cC&&!cs){dj+=bV;
bV=0;
c0=dj+c2
}else{if(cw==cC&&!cs){bV=0
}}}}}if(c0<0){c0=0
}if(bV==0&&c6==0){cT=cC;
c6=b6*12+cU-cC
}bN+=c2;
cY+=by;
cz+=dj;
cI+=c0;
cq+=bY;
cB+=c0+bY;
cg+=c2;
cH+=cy;
bP+=bW;
bL+=cJ;
cp+=cZ;
cv+=cZ;
cP+=cy;
if((cC%12)==0){if(cC==12){b9=cH;
bJ=bN;
da=(ck/100*(cA+bP+n));
dx=da
}else{n*=1+cD;
dx=((ck/100)*(bP+n))
}bS+=dx;
bP=0;
cY=0;
dx=0
}if(cs&&cw==cC){df=c9+cZ;
c9=0;
bM=bV+c0+bY;
bV=0;
cv-=cZ;
cB-=bY+c0
}if(!cO&&bG){if(s){cN.addRepeat(di.number(cC),di.dollars((cs&&cw==cC?df:cZ),2),di.dollars(cy,2),di.dollars(c9,2),di.dollars((cs&&cw==cC?bM:bY+c0),2),di.dollars(c2,2),di.dollars(bV,2))
}else{cN.addRepeat(di.number(cC),di.dollars((cs&&cw==cC?df:cZ),2),di.dollars((cs&&cw==cC?df-cy:cJ),2),di.dollars(cy,2),di.dollars(c9,2))
}}if((cC%12)==0){q[cK]=""+cK;
if(cs&&cw==cC){dm[cK]=bM;
dg[cK]=df
}else{dm[cK]=bV;
dg[cK]=c9
}c1[cK]=cH;
dw[cK]=(cs&&cw==cC?df-cZ+cp:cp);
cK+=1;
if(cO&&bG){if(s){cN.addRepeat(di.number(cC/12),di.dollars((cs&&cw==cC?df-cZ+cp:cp),2),di.dollars(cH,2),di.dollars(c9,2),di.dollars((cs&&cw==cC?bM-bY-c0+cI+cq:cI+cq),2),di.dollars(bN,2),di.dollars(bV,2))
}else{cN.addRepeat(di.number((cC/12)),di.dollars((cs&&cw==cC?df-cZ+cp:cp),2),di.dollars((cs&&cw==cC?df+bL-cy-cJ:bL),2),di.dollars(cH,2),di.dollars(c9,2))
}}cH=0;
bP=0;
bL=0;
cp=0;
bN=0;
cY=0;
cz=0;
cI=0;
cq=0
}if((cC==de)||((cC<bC?1:(cC-bC)%db)==0&&cC!=1&&bQ&&cC!=b6*12+cU&&co!=0&&cC>=bC)){cL+=co/100;
if(cL>b8/100){cL=b8/100
}if(cL<0.02){cL=0.02
}if(cL!=bT||(cC==de)){bT=cL;
bx=cL/12;
dc=di.round(KJE.PMT(bx,b6*12+cU-cC,bV),2);
cX=di.round(KJE.PMT(bx,b6*12+cU-cC,c9),2);
if(ce==0){ce=cX
}cb=cX;
if(cl<cX){cl=cX
}if(bQ&&co!=0){cu.addRepeat(cC+1,di.percent(cL,2),di.dollars(cX,2))
}}}}if(bQ&&co!=0){bF=cu.getRepeat();
cu.clearRepeat()
}this.PREPAY_SHORTEN_TOTAL_MONTHS=c6;
b3=(c6/12);
c6=(c6%12);
bU=this.MSG_PREPAY_MESSAGE;
b1=(bS/(b6+cU/12));
bA=c9;
b7=bV;
cB=cg+dt-b7;
cv=cP+dt-bA;
var cM=1;
if(s){cM=2
}var dd=this.DS_INTEREST=new Array(cM);
var bR=this.DS_PRINCIPAL=new Array(cM);
var cR=this.totalpaid_cats=new Array(cM);
dd[0]=cP;
bR[0]=dt-bA;
cR[0]=this.MSG_NORMAL_PAYMENTS;
if(s){dd[1]=cg;
bR[1]=dt-b7;
cR[1]=this.MSG_PREPAYMENTS;
dz=cP-cg
}this.cats=q;
this.sReturnMessage=cn;
this.MARGINAL_TAX_RATE=ck;
this.ADJUSTABLE_AFTER_FIRST_ADJ=ce;
this.ADJUSTABLE_PAYMENT_AMTS=bF;
this.ADJUSTABLE_RATE_HIGHEST=cl;
this.AVG_TAX_SAVINGS=b1;
this.DISCOUNT_POINTS_AMT=cA;
this.ENDING_BALANCE=bA;
this.FIRST_MONTH_INTEREST=cS;
this.FIRST_MONTH_PRINCIPAL=dp;
this.FIRST_YEAR_INTEREST=b9;
this.FIRST_YEAR_TAX_SAVINGS=da;
this.FULLY_INDEX_RATE=bH;
this.FULLY_INDEXED_PAYMENT=cb;
this.INTEREST_PAID=cP;
this.LOAN_APR=bZ;
this.LOAN_APR_AFT=cd;
this.LOAN_APR_AMOUNT=bO;
this.LOAN_APR_PAYMENT=cc;
this.LOAN_TO_VALUE=c7;
this.MONTHLY_HOME_INSURANCE=cj;
this.MONTHLY_PI=bD;
this.MONTHLY_PITI=bB;
this.MONTHLY_PROPERTY_TAXES=bI;
this.MONTHLY_HOME_ASSOCIATION=MONTHLY_HOME_ASSOCIATION;
this.MONTHS=cU;
this.ORIGINATION_FEES_AMT=dh;
this.PREPAY_ENDING_BALANCE=b7;
this.PREPAY_FIRST_YEAR_INTEREST=bJ;
this.PREPAY_INTEREST_PAID=cg;
this.PREPAY_INTEREST_SAVINGS=dz;
this.PREPAY_MESSAGE=bU;
this.PREPAY_PAYOFF_MONTHS=cT;
this.PREPAY_SHORTEN_MONTHS=c6;
this.PREPAY_SHORTEN_YEARS=b3;
this.PREPAY_TOTAL_OF_PAYMENTS=cB;
this.PREPAY_TOTAL_VALUE=dr;
this.PREPAY_TOTAL_VALUE_AFTX=cf;
this.TAX_ADJ_RATE=b5;
this.TOTAL_CLOSING_COSTS=bK;
this.TOTAL_OF_PAYMENTS=cv;
this.OTHER_FEES=b2;
this.BALLOON_PAYMENT=df;
this.PREPAY_BALLOON_PAYMENT=bM;
this.REGULAR_PAYMENTS=di.input(this.TERM_BALLOON*12-1);
this.MONTHLY_PMI=ca;
this.MONTH_PMI_EXEMPT=(ds>=du);
this.LOAN_AMOUNT=dt;
if(this.bMAPR>0){if(bZ>0.36){throw KJE.replace("KJE1",di.percent(bZ,3),this.MSG_ERROR_MAPR)
}}};
KJE.MortgageLoanCalculation.prototype.formatReport=function(c){for(var d=0;
d<this.OTHER_FEES_MAPR.length;
d++){c.dollars("OTHER_FEES_MAPR"+(d+1),this.OTHER_FEES_MAPR[d])
}c.year("FIXED_YEARS",this.ADJUSTABLE_RATE_FIXED/12);
c.year("ADJUSTABLE_YEARS",this.TERM+this.MONTHS/12-this.ADJUSTABLE_RATE_FIXED/12);
c.year("RECAST_TO_AMORTIZE_YEARS",this.RECAST_TO_AMORTIZE/12);
c.number("RECAST_TO_AMORTIZE",this.RECAST_TO_AMORTIZE);
c.number("REMAIN_AFTER_AMORTIZE",this.TERM*12+this.MONTHS-this.RECAST_TO_AMORTIZE);
c.replace("MSG_TERM",this.MSG_TERM);
c.replace("RESULT_MESSAGE",this.sReturnMessage);
c.year("YEARS_IN_HOME",this.YEARS_IN_HOME);
c.dollars("YEARLY_PROPERTY_TAXES",this.YEARLY_PROPERTY_TAXES);
c.dollars("YEARLY_HOME_INSURANCE",this.YEARLY_HOME_INSURANCE);
c.dollars("TOTAL_CLOSING_COSTS",this.TOTAL_CLOSING_COSTS);
c.number("TERM_BALLOON",this.TERM_BALLOON);
if(this.MONTHS>0){c.number("TERM",this.TERM*12+this.MONTHS);
c.replace("years","months")
}else{c.number("TERM",this.TERM)
}c.taxRate("TAX_ADJ_RATE",this.TAX_ADJ_RATE);
c.returnRate("SAVINGS_RATE",this.SAVINGS_RATE/100);
c.dollars("PURCHASE_PRICE",this.PURCHASE_PRICE);
c.dollars("DOWNPAYMENT",this.DOWNPAYMENT);
c.number("ADJUSTABLE_RATE_FEQ",this.ADJUSTABLE_RATE_FEQ);
c.percent("ADJUSTABLE_RATE_INCR",this.ADJUSTABLE_RATE_INCR/100,2);
c.percent("ADJUSTABLE_RATE_CAP",this.ADJUSTABLE_RATE_CAP/100,3);
c.replace("ADJUSTABLE_PAYMENT_AMTS",this.ADJUSTABLE_PAYMENT_AMTS);
c.dollars("ADJUSTABLE_RATE_HIGHEST",this.ADJUSTABLE_RATE_HIGHEST);
c.dollars("ADJUSTABLE_AFTER_FIRST_ADJ",this.ADJUSTABLE_AFTER_FIRST_ADJ);
c.number("ADJUSTABLE_RATE_FIXED",this.ADJUSTABLE_RATE_FIXED);
c.percent("RATE_INDEX_MARGIN",this.RATE_INDEX_MARGIN/100,3);
c.percent("RATE_INDEX",this.RATE_INDEX/100,3);
c.yesno("ADJUSTABLE_RATE",this.ADJUSTABLE_RATE);
c.replace("REGULAR_PAYMENTS",this.REGULAR_PAYMENTS);
if(this.PREPAY_TYPE==KJE.Default.PREPAY_NONE){c.replace("PREPAY_MESSAGE","");
c.replace("PREPAY_TYPE",this.PREPAY_TYPE);
c.replace("PREPAY_TOTAL_VALUE_AFTX","");
c.replace("PREPAY_TOTAL_VALUE","");
c.replace("PREPAY_TOTAL_OF_PAYMENTS","");
c.replace("PREPAY_SHORTEN_TERM","");
c.replace("PREPAY_STARTS_WITH","");
c.replace("PREPAY_SHORTEN_YEARS","");
c.replace("PREPAY_SHORTEN_MONTHS","");
c.replace("PREPAY_INTEREST_SAVINGS","");
c.replace("PREPAY_INTEREST_PAID","");
c.replace("PREPAY_FIRST_YEAR_INTEREST","");
c.replace("PREPAY_AMOUNT","");
c.replace("PREPAY_ENDING_BALANCE","");
c.replace("PREPAY_BALLOON_PAYMENT","");
c.replace("PREPAY_PAYOFF_PERIODS","")
}else{c.replace("PREPAY_MESSAGE",this.PREPAY_MESSAGE);
c.replace("PREPAY_TYPE",KJE.Default.PREPAY_PERIODS[this.PREPAY_TYPE]);
c.dollars("PREPAY_TOTAL_VALUE_AFTX",this.PREPAY_TOTAL_VALUE_AFTX);
c.dollars("PREPAY_TOTAL_VALUE",this.PREPAY_TOTAL_VALUE);
c.dollars("PREPAY_TOTAL_OF_PAYMENTS",this.PREPAY_TOTAL_OF_PAYMENTS);
c.number("PREPAY_STARTS_WITH",this.PREPAY_STARTS_WITH);
c.replace("PREPAY_SHORTEN_TERM",KJE.getTermLabel(this.PREPAY_SHORTEN_TOTAL_MONTHS));
c.year("PREPAY_SHORTEN_YEARS",this.PREPAY_SHORTEN_YEARS);
c.number("PREPAY_SHORTEN_MONTHS",this.PREPAY_SHORTEN_MONTHS);
c.dollars("PREPAY_INTEREST_SAVINGS",this.PREPAY_INTEREST_SAVINGS);
c.dollars("PREPAY_INTEREST_PAID",this.PREPAY_INTEREST_PAID);
c.dollars("PREPAY_FIRST_YEAR_INTEREST",this.PREPAY_FIRST_YEAR_INTEREST);
c.dollars("PREPAY_AMOUNT",this.PREPAY_AMOUNT);
c.dollars("PREPAY_ENDING_BALANCE",this.PREPAY_ENDING_BALANCE);
c.dollars("PREPAY_BALLOON_PAYMENT",this.PREPAY_BALLOON_PAYMENT);
c.replace("PREPAY_PAYOFF_PERIODS",KJE.getTermLabel(this.PREPAY_PAYOFF_MONTHS))
}c.dollars("OTHER_FEES",this.OTHER_FEES);
c.percent("ORIGINATION_FEES_PERCENT",this.ORIGINATION_FEES_PERCENT/100,2);
c.dollars("ORIGINATION_FEES_AMT",this.ORIGINATION_FEES_AMT);
c.dollars("MONTHLY_PROPERTY_TAXES",this.MONTHLY_PROPERTY_TAXES);
c.dollars("MONTHLY_HOME_ASSOCIATION",this.MONTHLY_HOME_ASSOCIATION);
c.dollars("MONTHLY_PITI",this.MONTHLY_PITI);
c.dollars("MONTHLY_PMI",this.MONTHLY_PMI);
c.dollars("MONTHLY_PI",this.MONTHLY_PI);
c.dollars("MONTHLY_HOME_INSURANCE",this.MONTHLY_HOME_INSURANCE);
c.taxRate("MARGINAL_TAX_RATE",this.MARGINAL_TAX_RATE/100);
c.taxRate("FEDERAL_TAX_RATE",this.FEDERAL_TAX_RATE/100);
c.taxRate("STATE_TAX_RATE",this.STATE_TAX_RATE/100);
c.percent("LOAN_TO_VALUE",this.LOAN_TO_VALUE,2);
c.percent("LOAN_APR_AFT",this.LOAN_APR_AFT,3);
c.dollars("LOAN_APR_PAYMENT",this.LOAN_APR_PAYMENT);
c.dollars("LOAN_APR_AMOUNT",this.LOAN_APR_AMOUNT);
c.percent("LOAN_APR",this.LOAN_APR,3);
c.dollars("LOAN_AMOUNT",this.LOAN_AMOUNT);
c.loanRate("INTEREST_RATE",this.INTEREST_RATE/100);
c.dollars("INTEREST_PAID",this.INTEREST_PAID);
c.inflationRate("INFLATION_RATE",this.INFLATION_RATE/100);
c.dollars("FIRST_YEAR_TAX_SAVINGS",this.FIRST_YEAR_TAX_SAVINGS);
c.dollars("FIRST_YEAR_INTEREST",this.FIRST_YEAR_INTEREST);
c.dollars("FIRST_MONTH_PRINCIPAL",this.FIRST_MONTH_PRINCIPAL);
c.dollars("FIRST_MONTH_INTEREST",this.FIRST_MONTH_INTEREST);
c.number("DISCOUNT_POINTS_PERCENT",this.DISCOUNT_POINTS_PERCENT,2);
c.dollars("DISCOUNT_POINTS_AMT",this.DISCOUNT_POINTS_AMT);
c.dollars("AVG_TAX_SAVINGS",this.AVG_TAX_SAVINGS);
c.dollars("TOTAL_OF_PAYMENTS",this.TOTAL_OF_PAYMENTS);
c.dollars("ENDING_BALANCE",this.ENDING_BALANCE);
c.dollars("BALLOON_PAYMENT",this.BALLOON_PAYMENT);
c.dollars("FULLY_INDEXED_PAYMENT",this.FULLY_INDEXED_PAYMENT);
c.dollars("MORTGAGE_TAX_DEDUCT_MAX_BALANCE",KJE.Default.MORTGAGE_TAX_DEDUCT_MAX_BALANCE);
c.yesno("INTEREST_ONLY",this.INTEREST_ONLY?1:0);
c.replace("CHECKBOX_BY_MONTH",(this.BY_YEAR?"":"CHECKED"));
c.replace("CHECKBOX_BY_YEAR",(this.BY_YEAR?"CHECKED":""));
c.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.MortgageLoanCalculation.prototype.getCategories=function(){return this.cats
};
KJE.MortgageLoanCalculation.prototype.getAmountPaidCategories=function(){return this.totalpaid_cats
};
KJE.MortgageLoanCalculation.APRAdjustable=function(n,w,H,B,u,C,I,F,A){var J=w;
var x=B/12;
var v=x;
var D=KJE.PMT(x,n,J);
var E=0;
var G=new Array();
G[0]=Math.round(100*(-w+H));
for(var y=1;
y<=n;
y++){J-=D-(x*J);
E+=D;
G[y]=Math.round(100*D);
if((y<u?1:(y-u)%C)==0&&y!=1&&y!=n){var z=I/12;
if(z>(v+F)){z=v+F
}if(z>A/12){z=A/12
}if(z!=v){v=z;
x=z;
D=KJE.PMT(x,n-y,J)
}}}var K=(I>B?I:B);
return(KJE.MortgageLoanCalculation.IRR(G,K/12)*12)
};
KJE.MortgageLoanCalculation.IRR=function(j,k){var m=k/2;
var g;
var l=j.length;
while(true){g=0;
for(var h=0;
h<l;
h++){g+=j[h]/Math.pow((1+k),h)
}if(g>-1&&g<1){break
}k+=(g>0?m:-m);
m=m/2
}return k
};
KJE.Default.MORTGAGE_TAX_DEDUCT_MAX_BALANCE=750000;
KJE.Default.PREPAY_NONE=0;
KJE.Default.PREPAY_WEEKLY=1;
KJE.Default.PREPAY_BIWEEKLY=2;
KJE.Default.PREPAY_2XMONTHLY=3;
KJE.Default.PREPAY_MONTHLY=4;
KJE.Default.PREPAY_YEARLY=5;
KJE.Default.PREPAY_ONETIME=6;
KJE.Default.PREPAY_FREQUENCY=[0,52,26,24,12,1,0];
[];
KJE.Default.getPrepayDrop=function(o,h,k){KJE.Default.PREPAY_PERIOD_IDs=KJE.parameters.get("ARRAY_PREPAY_PERIOD_ID",[KJE.Default.PREPAY_NONE,KJE.Default.PREPAY_MONTHLY,KJE.Default.PREPAY_YEARLY,KJE.Default.PREPAY_ONETIME]);
KJE.Default.PREPAY_PERIODS=KJE.parameters.get("ARRAY_PREPAY_PERIODS",[KJE.parameters.get("MSG_PREPAY_NONE","none"),"Weekly","bi-weekly","semi-monthly",KJE.parameters.get("MSG_PREPAY_MONTHLY","monthly"),KJE.parameters.set("MSG_PREPAY_YEARLY","yearly"),KJE.parameters.get("MSG_PREPAY_ONETIME","one-time")]);
var j=KJE.Default.PREPAY_PERIOD_IDs;
var l=j.length;
var m=KJE.Default.PREPAY_PERIODS;
var n=new Array(l);
for(i=0;
i<l;
i++){n[i]=m[j[i]]
}return KJE.getDropBox(o,KJE.parameters.get(o,(!h?KJE.Default.PAY_LOAN_IDs:h)),j,n,k)
};
KJE.CalcName="APR Calculator for Adjustable Rate Mortgages";
KJE.CalcType="MortgageAprAdjustable";
KJE.CalculatorTitleTemplate="APR for this Adjustable Rate Mortgage (ARM) is KJE1";
KJE.parseInputs=function(b){b=KJE.replace("**TERM**",KJE.getMortgageTermDrop("TERM",30),b);
return b
};
KJE.initialize=function(){KJE.CalcControl=new KJE.MortgageLoanCalculation();
KJE.GuiControl=new KJE.MortgageAprAdjustable(KJE.CalcControl)
};
KJE.MortgageAprAdjustable=function(w){var B=KJE;
var F=KJE.gLegend;
var z=KJE.inputs.items;
this.MSG_TITLE_TEXT=KJE.parameters.get("MSG_TITLE_TEXT","");
KJE.MortgageRateSlider("INTEREST_RATE","Starting interest rate");
KJE.RateSlider("RATE_INDEX","Current index",0,KJE.Default.MortgageRateMax,KJE.Default.MortgageRateMax);
KJE.RateSlider("RATE_INDEX_MARGIN","Margin",0,KJE.Default.MortgageRateMax,KJE.Default.MortgageRateMax);
KJE.PercentSlider("ADJUSTABLE_RATE_INCR","Maximum Adjustment",-3,6,2);
KJE.NumberSlider("ADJUSTABLE_RATE_FEQ","Months between adjustments",1,36,0);
KJE.NumberSlider("ADJUSTABLE_RATE_FIXED","Months before first adjustment",0,120,0);
KJE.MortgageAmtSlider("LOAN_AMOUNT","Mortgage amount");
KJE.MortgageTermDropBoxSlider("TERM","Term in years");
KJE.Label("MONTHLY_PAYMENT","Starting monthly payment",null,null,"KJEBold");
KJE.Label("LOAN_APR","Loan APR",null,null,"KJEBold");
KJE.Label("ADJUSTABLE_RATE_HIGHEST","Fully indexed payment",null,null,"KJEBold");
KJE.Radioboxes("BY_YEAR","Report amortization",true,"Annually","Monthly");
KJE.PercentSlider("ORIGINATION_FEES_PERCENT","Origination fee percent",0,5,2);
KJE.NumberSlider("DISCOUNT_POINTS_PERCENT","Points paid",-3,6,2);
if(w.USE_OTHER_FEES_AMOUNT){KJE.DollarSlider("OTHER_FEES","Other fees to include",-100000,100000)
}else{KJE.PercentSlider("OTHER_FEES","Other fees to include",0,5,2)
}var G=KJE.parameters.get("MSG_DROPPER_TITLE","Loan information: ");
var E=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 loan for KJE2 years at KJE3");
var s=KJE.parameters.get("MSG_PREPAY_IMMEDIATE","starting immediately");
var v=KJE.parameters.get("MSG_DROPPER_CLOSING","Closing Costs:");
var l=KJE.parameters.get("MSG_DROPPER_CLOSINGCLOSE","Total KJE1");
var x=KJE.parameters.get("MSG_DROPPER_ADJUSTMENT","Adjustments:");
var u=KJE.parameters.get("MSG_DROPPER_ADJUSTMENTCLOSE","Fixed rate KJE1 months, adjusts every KJE2 months thereafter.");
var C=function(){return G+KJE.subText(KJE.getKJEReplaced(E,B.dollars(w.LOAN_AMOUNT),B.number(w.TERM),B.percent(w.INTEREST_RATE/100,3)),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,G,C),KJE.colorList[0]);
var D=function(){return v+"|"+KJE.subText(KJE.getKJEReplaced(l,B.dollars(w.TOTAL_CLOSING_COSTS,2)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("CLOSING",false,v,D),KJE.colorList[0]);
var t=function(){return x+KJE.subText(KJE.getKJEReplaced(u,z.ADJUSTABLE_RATE_FIXED.getFormatted(),z.ADJUSTABLE_RATE_FEQ.getFormatted()),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("ADJUSTMENT",true,x,t),KJE.colorList[0]);
var A=KJE.gNewGraph(KJE.gSTACKED,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE1","Total Payments KJE1<div class='KJESubTitle'>KJE2</div>"));
A._legend._iOrientation=(KJE.gLegend.TOP_RIGHT);
A._showItemLabel=false;
var y=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH2",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE2","Principal Balance by Year"));
y._legend._iOrientation=KJE.gLegend.GRID_TOP_RIGHT;
y._iArea=KJE.gGraphLine.AREA_ALL
};
KJE.MortgageAprAdjustable.prototype.setValues=function(c){var d=KJE.inputs.items;
c.RATE_INDEX=d.RATE_INDEX.getValue();
c.RATE_INDEX_MARGIN=d.RATE_INDEX_MARGIN.getValue();
c.ADJUSTABLE_RATE_CAP=c.RATE_INDEX+c.RATE_INDEX_MARGIN;
c.ADJUSTABLE_RATE_INCR=d.ADJUSTABLE_RATE_INCR.getValue();
c.ADJUSTABLE_RATE_FEQ=d.ADJUSTABLE_RATE_FEQ.getValue();
c.ADJUSTABLE_RATE_FIXED=d.ADJUSTABLE_RATE_FIXED.getValue();
c.ADJUSTABLE_RATE=1;
c.LOAN_AMOUNT=d.LOAN_AMOUNT.getValue();
c.TERM=d.TERM.getValue();
c.INTEREST_RATE=d.INTEREST_RATE.getValue();
c.BY_YEAR=d.BY_YEAR.getValue();
c.ORIGINATION_FEES_PERCENT=d.ORIGINATION_FEES_PERCENT.getValue();
if(c.USE_OTHER_FEES_AMOUNT){c.OTHER_FEES=d.OTHER_FEES.getValue()
}else{c.OTHER_FEES_RATE=d.OTHER_FEES.getValue()
}c.DISCOUNT_POINTS_PERCENT=d.DISCOUNT_POINTS_PERCENT.getValue()
};
KJE.MortgageAprAdjustable.prototype.refresh=function(j){var k=KJE;
var l=KJE.gLegend;
var g=KJE.inputs.items;
var h=KJE.gGraphs[0];
var m=KJE.gGraphs[1];
KJE.setTitleTemplate(k.percent(j.LOAN_APR,3));
h.removeAll();
h.setGraphCategories(j.getAmountPaidCategories());
h.setTitleTemplate(k.dollars(j.TOTAL_OF_PAYMENTS),"Total Interest "+k.dollars(j.INTEREST_PAID));
h._axisX.setVisible(false);
h.add(new KJE.gGraphDataSeries(j.DS_INTEREST,j.MSG_INTEREST,h.getColor(1),"",j.MSG_POP_INTEREST));
h.add(new KJE.gGraphDataSeries(j.DS_PRINCIPAL,j.MSG_PRINCIPAL,h.getColor(2),"",j.MSG_POP_PRINCIPAL));
h.paint();
m.removeAll();
m._titleXAxis.setText(j.MSG_YEAR_NUMBER);
m.setGraphCategories(j.getCategories());
m.add(new KJE.gGraphDataSeries(j.DS_PRINCIPAL_BAL,j.MSG_NORMAL_PAYMENTS,m.getColor(1),"",j.MSG_POP_PRINCIPAL_NORMAL+" "));
m._legend.setVisible(false);
m.paint();
g.MONTHLY_PAYMENT.setText(k.dollars(j.MONTHLY_PI,2));
g.LOAN_APR.setText(k.percent(j.LOAN_APR,3));
g.ADJUSTABLE_RATE_HIGHEST.setText(k.dollars(j.ADJUSTABLE_RATE_HIGHEST,2))
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Mortgage information:</div></div> <div id=KJE-E-INPUTS > <div id=\"KJE-C-LOAN_AMOUNT\"><input id=\"KJE-LOAN_AMOUNT\" /></div> <div id=\"KJE-C-TERM\">**TERM**</div> <div id=\"KJE-C-INTEREST_RATE\"><input id=\"KJE-INTEREST_RATE\" /></div> <div id='KJE-C-RATE_INDEX'><input id='KJE-RATE_INDEX' /></div> <div id='KJE-C-RATE_INDEX_MARGIN'><input id='KJE-RATE_INDEX_MARGIN' /></div> <div id=\"KJE-C-MONTHLY_PAYMENT\"><div id=\"KJE-MONTHLY_PAYMENT\"></div></div> <div id=\"KJE-C-BY_YEAR\"><fieldset id='KJE-FS-BY_YEAR'><input id=\"KJE-BY_YEAR1\" type=radio name=BY_YEAR /><input id=\"KJE-BY_YEAR2\" type=radio name=BY_YEAR /></fieldset></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-ADJUSTMENT><div id=KJE-P-ADJUSTMENT>Adjustment information</div></div> <div id=KJE-E-ADJUSTMENT> <div id='KJE-C-ADJUSTABLE_RATE_FIXED'><input id='KJE-ADJUSTABLE_RATE_FIXED' /></div> <div id='KJE-C-ADJUSTABLE_RATE_FEQ'><input id='KJE-ADJUSTABLE_RATE_FEQ' /></div> <div id='KJE-C-ADJUSTABLE_RATE_INCR'><input id='KJE-ADJUSTABLE_RATE_INCR' /></div> <div id='KJE-C-ADJUSTABLE_AFTER_FIRST_ADJ'><div id='KJE-ADJUSTABLE_AFTER_FIRST_ADJ'></div></div> <div id='KJE-C-ADJUSTABLE_RATE_HIGHEST'><div id='KJE-ADJUSTABLE_RATE_HIGHEST'></div></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-CLOSING><div id=KJE-P-CLOSING>Input information:</div></div> <div id=KJE-E-CLOSING > <div id='KJE-C-ORIGINATION_FEES_PERCENT'><input id='KJE-ORIGINATION_FEES_PERCENT' /></div> <div id='KJE-C-DISCOUNT_POINTS_PERCENT'><input id='KJE-DISCOUNT_POINTS_PERCENT' /></div> <div id='KJE-C-OTHER_FEES'><input id='KJE-OTHER_FEES' /></div> <div id='KJE-C-LOAN_APR'><div id='KJE-LOAN_APR'></div></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** **GRAPH2** ";
KJE.DefinitionText=' <div><dt>Adjustable rate mortgage (ARM)</dt><dd>This calculator shows a "fully amortizing" ARM, which is the most common type of ARM. The monthly payment is calculated to pay off the entire mortgage balance at the end of a 30-year term. After the initial period, the interest rate and monthly payment adjust at the frequency specified. The amount an ARM can adjust each year, and over the life of the loan, are typically capped. Below is a list of common ARMs. <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Common Adjustable Rate Mortgages</caption> <thead class="KJEReportTHeader"> <tr class="KJEHeaderRow"><th class="KJEHeading KJECell40" scope="col">ARM Type</th><th class="KJEHeading KJECell60" scope="col">Months Fixed</th></tr> </thead> <tbody class="KJEReportTBody"> <tr class="KJEEvenRow"><th class="KJECellBorder KJELabel" scope="row">10/1 ARM</th><td class="KJECell KJELeft">Fixed for 120 months, adjusts annually for the remaining term of the loan.</td></tr> <tr class="KJEOddRow"><th class="KJECellBorder KJELabel" scope="row">7/1 ARM</th><td class="KJECell KJELeft">Fixed for 84 months, adjusts annually for the remaining term of the loan.</td></tr> <tr class="KJEEvenRow"><th class="KJECellBorder KJELabel" scope="row">5/1 ARM</th><td class="KJECell KJELeft">Fixed for 60 months, adjusts annually for the remaining term of the loan.</td></tr> <tr class="KJEOddRow"><th class="KJECellBorder KJELabel" scope="row">3/1 ARM</th><td class="KJECell KJELeft">Fixed for 36 months, adjusts annually for the remaining term of the loan.</td></tr> <tr class="KJEEvenRow"><th class="KJECellBorder KJELabel" scope="row">10/6 month ARM</th><td class="KJECell KJELeft">Fixed for 120 months, adjusts every six months for the remaining term of the loan.</td></tr> <tr class="KJEOddRow"><th class="KJECellBorder KJELabel" scope="row">7/6 month ARM</th><td class="KJECell KJELeft">Fixed for 84 months, adjusts every six months for the remaining term of the loan.</td></tr> <tr class="KJEEvenRow"><th class="KJECellBorder KJELabel" scope="row">5/6 month ARM</th><td class="KJECell KJELeft">Fixed for 60 months, adjusts every six months for the remaining term of the loan.</td></tr> <tr class="KJEOddRow"><th class="KJECellBorder KJELabel" scope="row">3/6 month ARM</th><td class="KJECell KJELeft">Fixed for 36 months, adjusts every six months for the remaining term of the loan.</td></tr> </tbody> </table></div> </dd> </div> <div id=\'KJE-D-LOAN_AMOUNT\' ><dt>Mortgage amount</dt><dd>Original or expected balance for your mortgage.</dd></div> <div id=\'KJE-D-INTEREST_RATE\' ><dt>Starting interest rate</dt><dd>Initial annual interest rate for this mortgage.</dd></div> <div id=\'KJE-D-TERM\' ><dt>Term in years</dt><dd>The number of years over which you will repay this loan. The most common mortgage terms are 15 years and 30 years.</dd></div> <div id=\'KJE-D-RATE_INDEX\' ><dt>Current index</dt><dd>The current interest rate of the index used to calculate the interest rate on this Adjustable Rate mortgage. The current index rate plus the margin on that rate produces the Fully Indexed Rate that is used to calculate the APR for this mortgage.</dd></div> <div id=\'KJE-D-RATE_INDEX_MARGIN\' ><dt>Margin</dt><dd>The interest rate percentage above the index, or the \'margin\', used to calculate the Fully Indexed Rate.</dd></div> <div id=\'KJE-D-MONTHLY_PAYMENT\' ><dt>Starting monthly payment</dt><dd>Monthly principal and interest payment (PI) based on your beginning balance and starting interest rate.</dd></div> <div id=\'KJE-D-ORIGINATION_FEES_PERCENT\' ><dt>Loan origination percent</dt><dd>The percent of your loan charged as a loan origination fee. For example, a 1% fee on a $120,000 loan would cost $1,200.</dd></div> <div id=\'KJE-D-DISCOUNT_POINTS_PERCENT\' ><dt>Discount points</dt><dd>Total number of &quot;points&quot; purchased to reduce your mortgage\'s interest rate. Each &quot;point&quot; costs 1% of your loan amount. As long as the points paid are not a broker\'s commission, they are considered tax-deductible in the year that they were paid.</dd></div> <div id=\'KJE-D-OTHER_FEES\' ><dt>Other fees</dt><dd>Any other fees that should be included in the APR calculation. These fees can vary by lender, but at a minimum usually includes prepaid interest.</dd></div> <div id=\'KJE-D-LOAN_APR\' ><dt>Annual Percentage Rate (APR)</dt><dd>A standard calculation used by lenders. It is designed to help borrowers compare different loan options. For example, a loan with a lower stated interest rate may be a bad value if its fees are too high. Likewise, a loan with a higher stated rate with very low fees could be an exceptional value. APR calculations incorporate these fees into a single rate. You can then compare loans with different fees, rates or different terms.</dd></div> <div id=\'KJE-D-ADJUSTABLE_RATE_CAP\' ><dt>Interest rate cap</dt><dd>This is the highest interest rate allowed by your mortgage. Your actual interest rate will not be adjusted above this rate.</dd></div> <div id=\'KJE-D-ADJUSTABLE_RATE_FIXED\' ><dt>Months before first adjustment</dt><dd>This is the number of months that the interest rate is fixed. After this period, the interest rate will be subject to rate adjustments. If you enter zero in this field, the tool assumes that the rate will begin making adjustments after initial period of time between adjustments has passed. If any number other than zero is entered, the first adjustment will take place at that time, and adjustments will happen at the frequency entered in the \'months between adjustments\' field.</dd></div> <div id=\'KJE-D-ADJUSTABLE_RATE_INCR\' ><dt>Expected adjustment</dt><dd>The amount you believe that your mortgage\'s interest rate will change. This amount will be added to or subtracted from your interest rate.</dd></div> <div id=\'KJE-D-ADJUSTABLE_RATE_FEQ\' ><dt>Months between adjustments</dt><dd>The number of payment periods between potential adjustments to your interest rate. The most common is 12 months, which means your payment could change at most once per year. Loans using the SOFR benchmark have six months between adjustments. The SOFR benchmark is based on what U.S. financial institutions pay each other for overnight loans. It is often used as a replacement for the LIBOR benchmark which is no longer used. </dd></div> <div><dt>Total payments</dt><dd>Total of all monthly payments over the full term of the mortgage. This total payment amount assumes that there are no prepayments of principal.</dd></div> <div><dt>Total interest</dt><dd>Total of all interest paid over the full term of the mortgage. This total interest amount assumes that there are no prepayments of principal.</dd></div> ';
KJE.ReportText=' <!--HEADING "APR Calculator for Adjustable Rate Mortgages" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>The Annual Percentage Rate (APR) for your Adjustable Rate Mortgage (ARM) is LOAN_APR.</h2> This is for a LOAN_AMOUNT loan for TERM years, with a starting payment of MONTHLY_PI and closing costs of TOTAL_CLOSING_COSTS. The APR was calculated with an interest rate that remains fixed at INTEREST_RATE for ADJUSTABLE_RATE_FIXED months, which will adjust to a fully indexed rate of ADJUSTABLE_RATE_CAP. Please see the table below for all payment amounts used to calculate this APR. <p> ADJUSTABLE_PAYMENT_AMTS <p> **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Mortgage Information</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Mortgage amount</th><td class="KJECell KJECell40">LOAN_AMOUNT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Term</th><td class="KJECell">TERM years</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Starting Interest rate</th><td class="KJECell">INTEREST_RATE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Initial monthly payment</th><td class="KJECell">MONTHLY_PI</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current index</th><td class="KJECell"> RATE_INDEX</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Margin</th><td class="KJECell"> RATE_INDEX_MARGIN</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total principal and interest payments</th><td class="KJECellStrong">TOTAL_OF_PAYMENTS</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest</th><td class="KJECellStrong">INTEREST_PAID</td></tr> </tfoot> </table> </div> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Rate Adjustments</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Months before first adjustment</th><td class="KJECell KJECell40">ADJUSTABLE_RATE_FIXED months</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Months between adjustments</th><td class="KJECell">ADJUSTABLE_RATE_FEQ months</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Maximum adjustment</th><td class="KJECell">ADJUSTABLE_RATE_INCR</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Fully indexed rate</th><td class="KJECell"> ADJUSTABLE_RATE_CAP</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Fully indexed payment</th><td class="KJECellStrong"> FULLY_INDEXED_PAYMENT</td></tr> </tfoot> </table> </div> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Closing Costs</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Origination fee</th><td class="KJECell KJECell40">ORIGINATION_FEES_AMT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Paid for points</th><td class="KJECell">DISCOUNT_POINTS_AMT</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Other fees</th><td class="KJECell">OTHER_FEES</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total closing costs</th><td class="KJECellStrong">TOTAL_CLOSING_COSTS</td></tr> </tfoot> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment Schedule</h2> **REPEATING GROUP** ';
KJE.parameters.set("ADJUSTABLE_RATE_FEQ",12);
KJE.parameters.set("ADJUSTABLE_RATE_FIXED",12);
KJE.parameters.set("ADJUSTABLE_RATE_INCR",2);
KJE.parameters.set("INTEREST_RATE",KJE.Default.RateAdj);
KJE.parameters.set("LOAN_AMOUNT",KJE.Default.MortgageAmt);
KJE.parameters.set("RATE_INDEX",KJE.Default.RateAdj);
KJE.parameters.set("RATE_INDEX_MARGIN",2.5);
KJE.parameters.set("DISCOUNT_POINTS_PERCENT",1);
KJE.parameters.set("ORIGINATION_FEES_PERCENT",1);
KJE.parameters.set("OTHER_FEES",800);
KJE.parameters.set("TERM",30);
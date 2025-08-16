KJE.parameters.set("SHOW_PITI",true);
KJE.parameters.set("PMI_SHOW",true);
KJE.parameters.set("PMI_RATE",0.5);
KJE.parameters.set("PMI_CALCULATE",true);
KJE.parameters.set("MSG_MONTHLY_PITI","Total monthly payment");
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
KJE.MortgageLoanCalculation.prototype.formatReport=function(e){var h=KJE;
var g=e;
for(var f=0;
f<this.OTHER_FEES_MAPR.length;
f++){g=KJE.replace("OTHER_FEES_MAPR"+(f+1),h.dollars(this.OTHER_FEES_MAPR[f],2),g)
}g=KJE.replace("FIXED_YEARS",h.number(this.ADJUSTABLE_RATE_FIXED/12),g);
g=KJE.replace("ADJUSTABLE_YEARS",h.number(this.TERM+this.MONTHS/12-this.ADJUSTABLE_RATE_FIXED/12),g);
g=KJE.replace("RECAST_TO_AMORTIZE_YEARS",h.number(this.RECAST_TO_AMORTIZE/12),g);
g=KJE.replace("RECAST_TO_AMORTIZE",h.number(this.RECAST_TO_AMORTIZE),g);
g=KJE.replace("REMAIN_AFTER_AMORTIZE",h.number(this.TERM*12+this.MONTHS-this.RECAST_TO_AMORTIZE),g);
g=KJE.replace("MSG_TERM",this.MSG_TERM,g);
g=KJE.replace("RESULT_MESSAGE",this.sReturnMessage,g);
g=KJE.replace("YEARS_IN_HOME",h.number(this.YEARS_IN_HOME),g);
g=KJE.replace("YEARLY_PROPERTY_TAXES",h.dollars(this.YEARLY_PROPERTY_TAXES,2),g);
g=KJE.replace("YEARLY_HOME_INSURANCE",h.dollars(this.YEARLY_HOME_INSURANCE,2),g);
g=KJE.replace("TOTAL_CLOSING_COSTS",h.dollars(this.TOTAL_CLOSING_COSTS,2),g);
g=KJE.replace("TERM_BALLOON",h.number(this.TERM_BALLOON),g);
if(this.MONTHS>0){g=KJE.replace("TERM",h.number(this.TERM*12+this.MONTHS),g);
g=KJE.replace("years","months",g)
}else{g=KJE.replace("TERM",h.number(this.TERM),g)
}g=KJE.replace("TAX_ADJ_RATE",h.percent(this.TAX_ADJ_RATE,3),g);
g=KJE.replace("SAVINGS_RATE",h.percent(this.SAVINGS_RATE/100,3),g);
g=KJE.replace("PURCHASE_PRICE",h.dollars(this.PURCHASE_PRICE,2),g);
g=KJE.replace("DOWNPAYMENT",h.dollars(this.DOWNPAYMENT,2),g);
g=KJE.replace("ADJUSTABLE_RATE_FEQ",h.number(this.ADJUSTABLE_RATE_FEQ),g);
g=KJE.replace("ADJUSTABLE_RATE_INCR",h.percent(this.ADJUSTABLE_RATE_INCR/100,2),g);
g=KJE.replace("ADJUSTABLE_RATE_CAP",h.percent(this.ADJUSTABLE_RATE_CAP/100,3),g);
g=KJE.replace("ADJUSTABLE_PAYMENT_AMTS",this.ADJUSTABLE_PAYMENT_AMTS,g);
g=KJE.replace("ADJUSTABLE_RATE_HIGHEST",h.dollars(this.ADJUSTABLE_RATE_HIGHEST,2),g);
g=KJE.replace("ADJUSTABLE_AFTER_FIRST_ADJ",h.dollars(this.ADJUSTABLE_AFTER_FIRST_ADJ,2),g);
g=KJE.replace("ADJUSTABLE_RATE_FIXED",h.number(this.ADJUSTABLE_RATE_FIXED),g);
g=KJE.replace("RATE_INDEX_MARGIN",h.percent(this.RATE_INDEX_MARGIN/100,3),g);
g=KJE.replace("RATE_INDEX",h.percent(this.RATE_INDEX/100,3),g);
g=KJE.replace("ADJUSTABLE_RATE",h.yesno(this.ADJUSTABLE_RATE),g);
g=KJE.replace("REGULAR_PAYMENTS",this.REGULAR_PAYMENTS,g);
if(this.PREPAY_TYPE==KJE.Default.PREPAY_NONE){g=KJE.replace("PREPAY_MESSAGE","",g);
g=KJE.replace("PREPAY_TYPE",this.PREPAY_TYPE,g);
g=KJE.replace("PREPAY_TOTAL_VALUE_AFTX","",g);
g=KJE.replace("PREPAY_TOTAL_VALUE","",g);
g=KJE.replace("PREPAY_TOTAL_OF_PAYMENTS","",g);
g=KJE.replace("PREPAY_SHORTEN_TERM","",g);
g=KJE.replace("PREPAY_STARTS_WITH","",g);
g=KJE.replace("PREPAY_SHORTEN_YEARS","",g);
g=KJE.replace("PREPAY_SHORTEN_MONTHS","",g);
g=KJE.replace("PREPAY_INTEREST_SAVINGS","",g);
g=KJE.replace("PREPAY_INTEREST_PAID","",g);
g=KJE.replace("PREPAY_FIRST_YEAR_INTEREST","",g);
g=KJE.replace("PREPAY_AMOUNT","",g);
g=KJE.replace("PREPAY_ENDING_BALANCE","",g);
g=KJE.replace("PREPAY_BALLOON_PAYMENT","",g);
g=KJE.replace("PREPAY_PAYOFF_PERIODS","",g)
}else{g=KJE.replace("PREPAY_MESSAGE",this.PREPAY_MESSAGE,g);
g=KJE.replace("PREPAY_TYPE",KJE.Default.PREPAY_PERIODS[this.PREPAY_TYPE],g);
g=KJE.replace("PREPAY_TOTAL_VALUE_AFTX",h.dollars(this.PREPAY_TOTAL_VALUE_AFTX,2),g);
g=KJE.replace("PREPAY_TOTAL_VALUE",h.dollars(this.PREPAY_TOTAL_VALUE,2),g);
g=KJE.replace("PREPAY_TOTAL_OF_PAYMENTS",h.dollars(this.PREPAY_TOTAL_OF_PAYMENTS,2),g);
g=KJE.replace("PREPAY_STARTS_WITH",h.number(this.PREPAY_STARTS_WITH),g);
g=KJE.replace("PREPAY_SHORTEN_TERM",KJE.getTermLabel(this.PREPAY_SHORTEN_TOTAL_MONTHS),g);
g=KJE.replace("PREPAY_SHORTEN_YEARS",h.number(this.PREPAY_SHORTEN_YEARS),g);
g=KJE.replace("PREPAY_SHORTEN_MONTHS",h.number(this.PREPAY_SHORTEN_MONTHS),g);
g=KJE.replace("PREPAY_INTEREST_SAVINGS",h.dollars(this.PREPAY_INTEREST_SAVINGS,2),g);
g=KJE.replace("PREPAY_INTEREST_PAID",h.dollars(this.PREPAY_INTEREST_PAID,2),g);
g=KJE.replace("PREPAY_FIRST_YEAR_INTEREST",h.dollars(this.PREPAY_FIRST_YEAR_INTEREST,2),g);
g=KJE.replace("PREPAY_AMOUNT",h.dollars(this.PREPAY_AMOUNT,2),g);
g=KJE.replace("PREPAY_ENDING_BALANCE",h.dollars(this.PREPAY_ENDING_BALANCE,2),g);
g=KJE.replace("PREPAY_BALLOON_PAYMENT",h.dollars(this.PREPAY_BALLOON_PAYMENT,2),g);
g=KJE.replace("PREPAY_PAYOFF_PERIODS",KJE.getTermLabel(this.PREPAY_PAYOFF_MONTHS),g)
}g=KJE.replace("OTHER_FEES",h.dollars(this.OTHER_FEES,2),g);
g=KJE.replace("ORIGINATION_FEES_PERCENT",h.percent(this.ORIGINATION_FEES_PERCENT/100,2),g);
g=KJE.replace("ORIGINATION_FEES_AMT",h.dollars(this.ORIGINATION_FEES_AMT,2),g);
g=KJE.replace("MONTHLY_PROPERTY_TAXES",h.dollars(this.MONTHLY_PROPERTY_TAXES,2),g);
g=KJE.replace("MONTHLY_HOME_ASSOCIATION",h.dollars(this.MONTHLY_HOME_ASSOCIATION,2),g);
g=KJE.replace("MONTHLY_PITI",h.dollars(this.MONTHLY_PITI,2),g);
g=KJE.replace("MONTHLY_PMI",h.dollars(this.MONTHLY_PMI,2),g);
g=KJE.replace("MONTHLY_PI",h.dollars(this.MONTHLY_PI,2),g);
g=KJE.replace("MONTHLY_HOME_INSURANCE",h.dollars(this.MONTHLY_HOME_INSURANCE,2),g);
g=KJE.replace("MARGINAL_TAX_RATE",h.percent(this.MARGINAL_TAX_RATE/100,2),g);
g=KJE.replace("FEDERAL_TAX_RATE",h.percent(this.FEDERAL_TAX_RATE/100,2),g);
g=KJE.replace("STATE_TAX_RATE",h.percent(this.STATE_TAX_RATE/100,2),g);
g=KJE.replace("LOAN_TO_VALUE",h.percent(this.LOAN_TO_VALUE,2),g);
g=KJE.replace("LOAN_APR_AFT",h.percent(this.LOAN_APR_AFT,3),g);
g=KJE.replace("LOAN_APR_PAYMENT",h.dollars(this.LOAN_APR_PAYMENT,2),g);
g=KJE.replace("LOAN_APR_AMOUNT",h.dollars(this.LOAN_APR_AMOUNT,2),g);
g=KJE.replace("LOAN_APR",h.percent(this.LOAN_APR,3),g);
g=KJE.replace("LOAN_AMOUNT",h.dollars(this.LOAN_AMOUNT,2),g);
g=KJE.replace("INTEREST_RATE",h.percent(this.INTEREST_RATE/100,3),g);
g=KJE.replace("INTEREST_PAID",h.dollars(this.INTEREST_PAID,2),g);
g=KJE.replace("INFLATION_RATE",h.percent(this.INFLATION_RATE/100,2),g);
g=KJE.replace("FIRST_YEAR_TAX_SAVINGS",h.dollars(this.FIRST_YEAR_TAX_SAVINGS,2),g);
g=KJE.replace("FIRST_YEAR_INTEREST",h.dollars(this.FIRST_YEAR_INTEREST,2),g);
g=KJE.replace("FIRST_MONTH_PRINCIPAL",h.dollars(this.FIRST_MONTH_PRINCIPAL,2),g);
g=KJE.replace("FIRST_MONTH_INTEREST",h.dollars(this.FIRST_MONTH_INTEREST,2),g);
g=KJE.replace("DISCOUNT_POINTS_PERCENT",h.number(this.DISCOUNT_POINTS_PERCENT,2),g);
g=KJE.replace("DISCOUNT_POINTS_AMT",h.dollars(this.DISCOUNT_POINTS_AMT,2),g);
g=KJE.replace("AVG_TAX_SAVINGS",h.dollars(this.AVG_TAX_SAVINGS,2),g);
g=KJE.replace("TOTAL_OF_PAYMENTS",h.dollars(this.TOTAL_OF_PAYMENTS,2),g);
g=KJE.replace("ENDING_BALANCE",h.dollars(this.ENDING_BALANCE,2),g);
g=KJE.replace("BALLOON_PAYMENT",h.dollars(this.BALLOON_PAYMENT,2),g);
g=KJE.replace("FULLY_INDEXED_PAYMENT",h.dollars(this.FULLY_INDEXED_PAYMENT,2),g);
g=KJE.replace("MORTGAGE_TAX_DEDUCT_MAX_BALANCE",h.dollars(KJE.Default.MORTGAGE_TAX_DEDUCT_MAX_BALANCE),g);
g=KJE.replace("INTEREST_ONLY",h.yesno(this.INTEREST_ONLY?1:0),g);
g=KJE.replace("CHECKBOX_BY_MONTH",(this.BY_YEAR?"":"CHECKED"),g);
g=KJE.replace("CHECKBOX_BY_YEAR",(this.BY_YEAR?"CHECKED":""),g);
g=g.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());
this.sSchedule.clearRepeat();
return g
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
KJE.CalcName="Mortgage Calculator with PMI";
KJE.CalcType="MortgageLoan7";
KJE.CalculatorTitleTemplate="Monthly payment is KJE1";
KJE.parseInputs=function(b){b=KJE.replace("**TERM**",KJE.getMortgageTermDrop("TERM",30),b);
if(KJE.Default.getPrepayDrop){b=KJE.replace("**PREPAY_TYPE**",KJE.Default.getPrepayDrop("PREPAY_TYPE",KJE.Default.PREPAY_NONE),b)
}return b
};
KJE.initialize=function(){KJE.CalcControl=new KJE.MortgageLoanCalculation();
KJE.GuiControl=new KJE.MortgageLoan(KJE.CalcControl)
};
KJE.MortgageLoan=function(p){var u=KJE;
var r=KJE.inputs.items;
this.MSG_GRAPHTOTAL_SUBTITLE1=KJE.parameters.get("MSG_GRAPHTOTAL_SUBTITLE1","Total Interest KJE1");
this.MSG_GRAPHTOTAL_SUBTITLE2=KJE.parameters.get("MSG_GRAPHTOTAL_SUBTITLE2","Prepayment Interest Savings KJE1");
this.MSG_GRAPHPAYMENTS_SUBTITLE1=KJE.parameters.get("MSG_GRAPHPAYMENTS_SUBTITLE1","Principal Balances by Year");
this.MSG_GRAPHPAYMENTS_SUBTITLE2=KJE.parameters.get("MSG_GRAPHPAYMENTS_SUBTITLE2","Prepayment Term KJE1");
KJE.MortgageAmtSlider("LOAN_AMOUNT","Mortgage amount");
KJE.MortgageTermDropBoxSlider("TERM","Term in years",null,KJE.parameters.get("TERM_HIDE_SLIDER",false));
KJE.NumberSlider("TERM_MONTHS","Term in months",KJE.parameters.get("TERM_MONTHS_MIN",0),KJE.parameters.get("TERM_MONTHS_MAX",480));
if(p.bTERMINMONTHS){r.TERM.hide()
}else{r.TERM_MONTHS.hide()
}KJE.MortgageRateSlider("INTEREST_RATE","Interest rate");
KJE.DropBox("PREPAY_TYPE","Prepayment type");
KJE.Label("MONTHLY_PAYMENT",p.SHOW_PITI?"Monthly payment (PI)":"Monthly payment",null,null,"KJEBold");
KJE.NumberSlider("PREPAY_STARTS_WITH","Start with payment",0,KJE.Default.MortgageTermMax*12);
KJE.Slider("PREPAY_AMOUNT","Prepayment amount",0,10000000,2,u.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));
KJE.Radioboxes("BY_YEAR","Report amortization",true,"Annually","Monthly");
if(p.SHOW_PITI){KJE.Slider("YEARLY_PROPERTY_TAXES","Annual property taxes",0,10000000,0,u.FMT_DOLLARS,0,KJE.s_label[1],KJE.useScale(1));
KJE.Slider("YEARLY_HOME_INSURANCE","Annual home insurance",0,10000000,0,u.FMT_DOLLARS,0,KJE.s_label[1],KJE.useScale(1));
KJE.Slider("MONTHLY_HOME_ASSOCIATION","Monthly HOA fee",0,100000,0,u.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));
KJE.Label("MONTHLY_PITI","Monthly payment (PITI)",null,null,"KJEBold")
}KJE.DollarSlider("MONTHLY_PMI","Monthly PMI",0,100000,2,u.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));
if(p.PMI_CALCULATE&&!KJE.parameters.get("PMI_SHOW",false)){r.MONTHLY_PMI.hide()
}KJE.MortgageAmtSlider("PURCHASE_PRICE","Purchase price");
KJE.MortgageAmtSlider("DOWNPAYMENT","Down payment");
KJE.Label("LOAN_AMOUNT_CALCULATED","Loan amount",null,null,"KJEBold");
var y=KJE.parameters.get("MSG_DROPPER_TITLE","Loan information: ");
var w=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 loan for KJE2 years at KJE3");
var o=KJE.parameters.get("MSG_PREPAY_IMMEDIATE","starting immediately");
var t=KJE.parameters.get("MSG_DROPPER_PREPAYMENTS","Prepayments:");
var x=KJE.parameters.get("MSG_DROPPER_PREPAYMENTSCLOSE","KJE1");
var v=function(){return y+KJE.subText(KJE.getKJEReplaced(w,u.dollars(p.LOAN_AMOUNT),u.number(p.TERM),u.percent(p.INTEREST_RATE/100,3)),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,y,v),KJE.colorList[0]);
var l=function(){if(r.PREPAY_TYPE.getValue()==KJE.Default.PREPAY_NONE){return t+KJE.subText(KJE.Default.PREPAY_PERIODS[KJE.Default.PREPAY_NONE],"KJECenter")
}else{var a=r.PREPAY_STARTS_WITH.getFormatted();
return t+KJE.subText(r.PREPAY_AMOUNT.getFormatted()+" "+r.PREPAY_TYPE.getFormatted().toLowerCase()+" "+(r.PREPAY_STARTS_WITH.getValue()<1?o:r.PREPAY_STARTS_WITH.getName().toLowerCase()+" "+r.PREPAY_STARTS_WITH.getFormatted()),"KJECenter")
}};
KJE.addDropper(new KJE.Dropper("PREPAY",false,t,l),KJE.colorList[0]);
var s=KJE.gNewGraph(KJE.gSTACKED,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE1","Total Payments KJE1<div class='KJESubTitle'>KJE2</div>"));
s._legend._iOrientation=(KJE.gLegend.TOP_RIGHT);
s._titleYAxis.setText(KJE.sCurrency);
s._showItemLabel=false;
var q=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH2",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE2","Mortgage Term KJE1<div class='KJESubTitle'>KJE2</div>"));
q._legend._iOrientation=KJE.gLegend.GRID_TOP_RIGHT;
q._iArea=KJE.gGraphLine.AREA_ALL
};
KJE.MortgageLoan.prototype.setValues=function(c){var d=KJE.inputs.items;
c.LOAN_AMOUNT=d.LOAN_AMOUNT.getValue();
c.PURCHASE_PRICE=d.PURCHASE_PRICE.getValue();
c.DOWNPAYMENT=d.DOWNPAYMENT.getValue();
if(c.bTERMINMONTHS){c.TERM=d.TERM_MONTHS.getValue()
}else{c.TERM=d.TERM.getValue()
}c.INTEREST_RATE=d.INTEREST_RATE.getValue();
c.PREPAY_TYPE=d.PREPAY_TYPE.getValue();
c.PREPAY_AMOUNT=d.PREPAY_AMOUNT.getValue();
c.PREPAY_STARTS_WITH=d.PREPAY_STARTS_WITH.getValue();
c.BY_YEAR=d.BY_YEAR.getValue();
if(c.SHOW_PITI){c.YEARLY_PROPERTY_TAXES=d.YEARLY_PROPERTY_TAXES.getValue();
c.YEARLY_HOME_INSURANCE=d.YEARLY_HOME_INSURANCE.getValue();
c.MONTHLY_HOME_ASSOCIATION=d.MONTHLY_HOME_ASSOCIATION.getValue()
}c.MONTHLY_PMI=d.MONTHLY_PMI.getValue();
if(c.PREPAY_TYPE==KJE.Default.PREPAY_NONE){d.PREPAY_AMOUNT.disable();
d.PREPAY_STARTS_WITH.disable()
}else{d.PREPAY_AMOUNT.enable();
d.PREPAY_STARTS_WITH.enable()
}};
KJE.MortgageLoan.prototype.refresh=function(h){var f=KJE.inputs.items;
var j=KJE;
var g=KJE.gGraphs[0];
var k=KJE.gGraphs[1];
KJE.setTitleTemplate(j.dollars(h.SHOW_PITI?h.MONTHLY_PITI:h.MONTHLY_PI,2));
g.removeAll();
g.setGraphCategories(h.getAmountPaidCategories());
if(h.PREPAY_TYPE==KJE.Default.PREPAY_NONE){g.setTitleTemplate(j.dollars(h.TOTAL_OF_PAYMENTS),KJE.getKJEReplaced(this.MSG_GRAPHTOTAL_SUBTITLE1,j.dollars(h.INTEREST_PAID)));
g._axisX.setVisible(false)
}else{g.setTitleTemplate(j.dollars(h.TOTAL_OF_PAYMENTS),KJE.getKJEReplaced(this.MSG_GRAPHTOTAL_SUBTITLE2,j.dollars(h.PREPAY_INTEREST_SAVINGS)));
g._axisX.setVisible(true)
}g.add(new KJE.gGraphDataSeries(h.DS_INTEREST,h.MSG_INTEREST,g.getColor(1),"",h.MSG_POP_INTEREST));
g.add(new KJE.gGraphDataSeries(h.DS_PRINCIPAL,h.MSG_PRINCIPAL,g.getColor(2),"",h.MSG_POP_PRINCIPAL));
g.paint();
k.removeAll();
k._titleXAxis.setText(h.MSG_YEAR_NUMBER);
k.setGraphCategories(h.getCategories());
if(h.PREPAY_TYPE==KJE.Default.PREPAY_NONE){k.add(new KJE.gGraphDataSeries(h.DS_PRINCIPAL_BAL,h.MSG_NORMAL_PAYMENTS,k.getColor(1),"",h.MSG_POP_PRINCIPAL_NORMAL+" "));
k.setTitleTemplate(KJE.getTermLabel(h.TOTAL_MONTHS),this.MSG_GRAPHPAYMENTS_SUBTITLE1);
k._legend.setVisible(false)
}else{k.add(new KJE.gGraphDataSeries(h.DS_PRINCIPAL_BAL,h.MSG_NORMAL_PAYMENTS,k.getColor(1),"",h.MSG_POP_PRINCIPAL_NORMAL+" "));
k.add(new KJE.gGraphDataSeries(h.DS_PREPAY_PRINCIPAL_BAL,h.MSG_PREPAYMENTS,k.getColor(2),"",h.MSG_POP_PRINCIPAL_PREPAY+" "));
k.setTitleTemplate(KJE.getTermLabel(h.TOTAL_MONTHS),KJE.getKJEReplaced(this.MSG_GRAPHPAYMENTS_SUBTITLE2,KJE.getTermLabel(h.PREPAY_PAYOFF_MONTHS)));
k._legend.setVisible(true)
}k.paint();
f.LOAN_AMOUNT_CALCULATED.setText(j.dollars(h.LOAN_AMOUNT,2));
f.MONTHLY_PAYMENT.setText(j.dollars(h.MONTHLY_PI,2));
if(h.SHOW_PITI){f.MONTHLY_PITI.setText(j.dollars(h.MONTHLY_PITI,2))
}f.MONTHLY_PMI.setValue(j.round(h.MONTHLY_PMI,2),true);
if(h.MONTH_PMI_EXEMPT){f.MONTHLY_PMI.disable()
}else{f.MONTHLY_PMI.enable()
}};
KJE.InputScreenText=' <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Mortgage information:</div></div> <div id=KJE-E-INPUTS > <div id="KJE-C-PURCHASE_PRICE"><input id="KJE-PURCHASE_PRICE" /></div> <div id="KJE-C-DOWNPAYMENT"><input id="KJE-DOWNPAYMENT" /></div> <div id="KJE-C-LOAN_AMOUNT_CALCULATED"><div id="KJE-LOAN_AMOUNT_CALCULATED"></div></div> <div id="KJE-C-TERM">**TERM**</div> <div id="KJE-C-TERM_MONTHS"><input id=\'KJE-TERM_MONTHS\' /></div> <div id="KJE-C-INTEREST_RATE"><input id="KJE-INTEREST_RATE" /></div> <div id="KJE-C-YEARLY_PROPERTY_TAXES"><input id="KJE-YEARLY_PROPERTY_TAXES" /></div> <div id="KJE-C-YEARLY_HOME_INSURANCE"><input id="KJE-YEARLY_HOME_INSURANCE" /></div> <div id="KJE-C-MONTHLY_HOME_ASSOCIATION"><input id="KJE-MONTHLY_HOME_ASSOCIATION" /></div> <div id=\'KJE-C-MONTHLY_PMI\'><input id=\'KJE-MONTHLY_PMI\' /></div> <div id="KJE-C-MONTHLY_PAYMENT"><div id="KJE-MONTHLY_PAYMENT"></div></div> <div id="KJE-C-MONTHLY_PITI"><div id="KJE-MONTHLY_PITI"></div></div> <div id="KJE-C-BY_YEAR"><fieldset id=\'KJE-FS-BY_YEAR\'><input id="KJE-BY_YEAR1" type=radio name=BY_YEAR /><input id="KJE-BY_YEAR2" type=radio name=BY_YEAR /></fieldset></div> <div style="height:10px"></div> </div> <div id=KJE-D-PREPAY><div id=KJE-P-PREPAY>Prepayment information</div></div> <div id=KJE-E-PREPAY > <div id="KJE-C-PREPAY_TYPE">**PREPAY_TYPE**</div> <div id="KJE-C-PREPAY_AMOUNT"><input id="KJE-PREPAY_AMOUNT" /></div> <div id="KJE-C-PREPAY_STARTS_WITH"><input id="KJE-PREPAY_STARTS_WITH" /></div> <div style="height:10px"></div> </div> **GRAPH1** **GRAPH2** ';
KJE.DefinitionText=' <div id=\'KJE-D-PURCHASE_PRICE\' ><dt>Purchase price</dt><dd>Purchase price of the home you wish to buy.</dd></div> <div id=\'KJE-D-DOWNPAYMENT\' ><dt>Down payment</dt><dd>Amount you have for the down payment on your purchase.</dd></div> <div id="KJE-D-LOAN_AMOUNT_CALCULATED" ><dt>Mortgage amount</dt><dd>Original or expected balance for your mortgage.</div> <div id="KJE-D-TERM" ><dt>Term in years</dt><dd>The number of years over which you will repay this loan. The most common mortgage terms are 15 years and 30 years.</div> <div id="KJE-D-INTEREST_RATE" ><dt>Interest rate</dt><dd>Annual fixed interest rate for this mortgage. Please note that the interest rate is different from the Annual Percentage Rate (APR), which includes other expenses such as mortgage insurance, and the origination fee and or point(s), which were paid when the mortgage was first originated. The APR is normally higher than the simple interest rate.</div> <div id="KJE-D-MONTHLY_PAYMENT" ><dt>Monthly payment (PI)</dt><dd>Monthly principal and interest payment (PI).</div> <div id="KJE-D-MONTHLY_PITI" ><dt>Monthly payment (PITI)</dt><dd>Monthly payment including principal, interest, homeowners insurance, property taxes, PMI and home owners association (HOA) fee.</div> <div id="KJE-D-MONTHLY_HOME_ASSOCIATION" ><dt>Monthly HOA fee</dt><dd>Monthly home owners association (HOA) fee. Enter your monthly amount if you have a home owner association fee or any additional required monthly fee you would like to include in your payment.</div> <div id="KJE-D-YEARLY_PROPERTY_TAXES" ><dt>Annual property taxes</dt><dd>The annual amount you expect to pay in property taxes. This amount is divided by 12 to determine the monthly property tax included in PITI.</div> <div id="KJE-D-YEARLY_HOME_INSURANCE" ><dt>Annual home insurance</dt><dd>The annual amount you expect to pay in homeowners insurance. This amount is divided by 12 to determine the monthly home owners insurance included in PITI.</div> <div id="KJE-D-TOTAL_PAYMENTS" ><dt>Total payments</dt><dd>Total of all monthly payments over the full term of the mortgage. This total payment amount assumes that there are no prepayments of principal.</div> <div id="KJE-D-TOTAL_INTEREST" ><dt>Total interest</dt><dd>Total of all interest paid over the full term of the mortgage. This total interest amount assumes that there are no prepayments of principal.</div> <div id="KJE-D-PREPAY_TYPE" ><dt>Prepayment type</dt><dd>The frequency of prepayment. The options are none, monthly, yearly and one-time payment.</div> <div id="KJE-D-PREPAY_AMOUNT" ><dt>Prepayment amount</dt><dd>Amount that will be prepaid on your mortgage. This amount will be applied to the mortgage principal balance, based on the prepayment type.</div> <div id="KJE-D-PREPAY_STARTS_WITH" ><dt>Start with payment</dt><dd>This is the payment number that your prepayments will begin with. For a one-time payment, this is the payment number that the single prepayment will be included in. All prepayments of principal are assumed to be received by your lender in time to be included in the following month\'s interest calculation. If you choose to prepay with a one-time payment for payment number zero, the prepayment is assumed to happen before the first payment of the loan.</div> <div id="KJE-D-SAVINGS" ><dt>Savings</dt><dd>Total amount of interest you will save by prepaying your mortgage.</div> <div id="KJE-D-BY_YEAR" ><dt>Report amortization</dt><dd>Choose how the report will display your payment schedule. Annually will summarize payments and balances by year. Monthly will show every payment for the entire term.</div> <div id=\'KJE-D-MONTHLY_PMI\'><dt>Monthly PMI</dt><dd>Monthly cost of Private Mortgage Insurance (PMI). For loans secured with less than 20% down, PMI is estimated at 0.5% of your loan balance each year.</dd></div> ';
KJE.ReportText=" <h2 class='KJEReportHeader KJEFontHeading'>Based on the information you entered, your payment is MONTHLY_PITI for TERM years with a rate of INTEREST_RATE.</h2> **GRAPH** <div class=KJECenter> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Mortgage Summary</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Purchase price</th><td class=KJECell>PURCHASE_PRICE</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Down payment</th><td class=KJECell>DOWNPAYMENT</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Loan amount</th><td class=KJECell>LOAN_AMOUNT</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Term</th><td class=KJECell>TERM years</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Interest rate</th><td class=KJECell>INTEREST_RATE</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Monthly payment (PI)</th><td class=KJECell>MONTHLY_PI</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Monthly Home Owner Association (HOA) fee</th><td class=KJECell>MONTHLY_HOME_ASSOCIATION</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Annual home insurance</th><td class=KJECell>YEARLY_HOME_INSURANCE</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Annual property taxes</th><td class=KJECell>YEARLY_PROPERTY_TAXES</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Monthly PMI</th><td class=\"KJECell\">MONTHLY_PMI</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total monthly payment*</th><td class=KJECell>MONTHLY_PITI</td></tr> </tbody> <tfoot class='KJEReportTFooter'> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total principal and interest payments</th><td class=KJECellStrong>TOTAL_OF_PAYMENTS</td></tr> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total interest</th><td class=KJECellStrong>INTEREST_PAID</td></tr> </tfoot> </table></div> <div class=KJEFooter>*Principal, Interest, Taxes, Insurance, HOA Fee and PMI</div> </div> <h2 class='KJEReportHeader KJEFontHeading'>Prepayment Results</h2>Principal prepayments on your mortgage can save you a great deal of interest. They can also shorten the time it takes to pay off your mortgage. PREPAY_MESSAGE <div class=KJECenter> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Prepayment Summary</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Amount</th><td class=KJECell>PREPAY_AMOUNT PREPAY_TYPE</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Start with payment</th><td class=KJECell>PREPAY_STARTS_WITH</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total payments</th><td class=KJECell>PREPAY_TOTAL_OF_PAYMENTS</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total interest</th><td class=KJECell>PREPAY_INTEREST_PAID</td></tr> </tbody> <tfoot class='KJEReportTFooter'> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Interest savings</th><td class=KJECellStrong>PREPAY_INTEREST_SAVINGS</td></tr> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Mortgage paid off in</th><td class=KJECellStrong>PREPAY_PAYOFF_PERIODS</td></tr> </tfoot> </table></div> </div> <h2 class='KJEScheduleHeader KJEFontHeading'>Payment Schedule</h2> **REPEATING GROUP** ";
KJE.parameters.set("INTEREST_RATE",KJE.Default.RateFix30);
KJE.parameters.set("LOAN_AMOUNT",KJE.Default.MortgageAmt);
KJE.parameters.set("PREPAY_AMOUNT",0);
KJE.parameters.set("PREPAY_TYPE",KJE.Default.PREPAY_NONE);
KJE.parameters.set("PREPAY_STARTS_WITH",1);
KJE.parameters.set("PREPAY_AMOUNT","0");
KJE.parameters.set("TERM",15);
KJE.parameters.set("PMI_RATE",0.5);
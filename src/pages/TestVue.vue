<template>
  <div>
    {{ xml2json(srcDOM) }}
  </div>
</template>

<script setup lang="ts">
function xml2json(srcDOM: any) {
  let children = [...srcDOM.children];

  // base case for recursion.
  if (!children.length) {
    return srcDOM.innerHTML;
  }

  // initializing object to be returned.
  let jsonResult: any = {};

  for (let child of children) {
    // checking is child has siblings of same name.
    let childIsArray =
      children.filter((eachChild) => eachChild.nodeName === child.nodeName)
        .length > 1;

    // if child is array, save the values as array, else as strings.
    if (childIsArray) {
      if (jsonResult[child.nodeName] === undefined) {
        jsonResult[child.nodeName] = [xml2json(child)];
      } else {
        jsonResult[child.nodeName].push(xml2json(child));
      }
    } else {
      jsonResult[child.nodeName] = xml2json(child);
    }
  }

  return jsonResult;
}

// testing the function
let xmlstr = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.02">
    <BkToCstmrStmt>
        <GrpHdr>
            <MsgId>0404550045.2024-01-02</MsgId>
            <CreDtTm>2024-02-17T10:27:56.03+01:00</CreDtTm>
            <MsgPgntn>
                <PgNb>1</PgNb>
                <LastPgInd>true</LastPgInd>
            </MsgPgntn>
        </GrpHdr>
        <Stmt>
            <Id>0404550045.2024-01-02</Id>
            <ElctrncSeqNb>000000000000000034</ElctrncSeqNb>
            <CreDtTm>2024-02-17T10:27:56.03+01:00</CreDtTm>
            <Acct>
                <Id>
                    <IBAN>NL31ABNA0404550045</IBAN>
                </Id>
                <Ccy>EUR</Ccy>
                <Svcr>
                    <FinInstnId>
                        <BIC>ABNANL2A</BIC>
                    </FinInstnId>
                </Svcr>
            </Acct>
            <Bal>
                <Tp>
                    <CdOrPrtry>
                        <Cd>PRCD</Cd>
                    </CdOrPrtry>
                </Tp>
                <Amt Ccy="EUR">000000000000087.71</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <Dt>
                    <Dt>2023-12-29</Dt>
                </Dt>
            </Bal>
            <Bal>
                <Tp>
                    <CdOrPrtry>
                        <Cd>CLBD</Cd>
                    </CdOrPrtry>
                </Tp>
                <Amt Ccy="EUR">000000000000047.65</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <Dt>
                    <Dt>2024-01-02</Dt>
                </Dt>
            </Bal>
            <Ntry>
                <Amt Ccy="EUR">000000000000001.90</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>BOOK</Sts>
                <BookgDt>
                    <Dt>2024-01-02</Dt>
                </BookgDt>
                <ValDt>
                    <Dt>2024-01-02</Dt>
                </ValDt>
                <AcctSvcrRef>0102150009198545</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>PMNT</Cd>
                        <Fmly>
                            <Cd>CCRD</Cd>
                            <SubFmlyCd>POSD</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>N369</Cd>
                        <Issr>ABNAMRO</Issr>
                    </Prtry>
                </BkTxCd>
                <AddtlNtryInf>BEA, Apple Pay                  Kantoor Hellebroek 418,PAS397   NR:01818707, 02.01.24/15:00     Halle, Land: BEL</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="EUR">000000000000004.75</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>BOOK</Sts>
                <BookgDt>
                    <Dt>2024-01-02</Dt>
                </BookgDt>
                <ValDt>
                    <Dt>2024-01-02</Dt>
                </ValDt>
                <AcctSvcrRef>0102114337496872</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>PMNT</Cd>
                        <Fmly>
                            <Cd>CCRD</Cd>
                            <SubFmlyCd>POSD</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>N369</Cd>
                        <Issr>ABNAMRO</Issr>
                    </Prtry>
                </BkTxCd>
                <AddtlNtryInf>BEA, Apple Pay                  4185 KANTINE HELLEBROE,PAS397   NR:01491581, 02.01.24/11:43     HALLE, Land: BEL</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="EUR">000000000000002.80</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>BOOK</Sts>
                <BookgDt>
                    <Dt>2024-01-02</Dt>
                </BookgDt>
                <ValDt>
                    <Dt>2024-01-02</Dt>
                </ValDt>
                <AcctSvcrRef>0102064950328348</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>PMNT</Cd>
                        <Fmly>
                            <Cd>CCRD</Cd>
                            <SubFmlyCd>POSD</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>N369</Cd>
                        <Issr>ABNAMRO</Issr>
                    </Prtry>
                </BkTxCd>
                <AddtlNtryInf>BEA, Apple Pay                  4185 KANTINE HELLEBROE,PAS397   NR:01491581, 02.01.24/06:49     HALLE, Land: BEL</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="EUR">000000000000014.00</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>BOOK</Sts>
                <BookgDt>
                    <Dt>2024-01-02</Dt>
                </BookgDt>
                <ValDt>
                    <Dt>2024-01-01</Dt>
                </ValDt>
                <AcctSvcrRef>3922002BCPC03EEK0BI</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>XTND</Cd>
                        <Fmly>
                            <Cd>NTAV</Cd>
                            <SubFmlyCd>NTAV</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>N944</Cd>
                        <Issr>ABNAMRO</Issr>
                    </Prtry>
                </BkTxCd>
                <NtryDtls>
                    <TxDtls>
                        <Refs>
                            <MsgId>ISCT240102006055001</MsgId>
                            <AcctSvcrRef>3922002BCPC03EEK0BI</AcctSvcrRef>
                            <EndToEndId>01-01-2024 12:16 0140000832158636</EndToEndId>
                        </Refs>
                        <AmtDtls>
                            <TxAmt>
                                <Amt Ccy="EUR">000000000000014.00</Amt>
                            </TxAmt>
                        </AmtDtls>
                        <RltdPties>
                            <Cdtr>
                                <Nm>Bunq B.V.</Nm>
                            </Cdtr>
                            <CdtrAcct>
                                <Id>
                                    <IBAN>NL78BUNQ2291284258</IBAN>
                                </Id>
                            </CdtrAcct>
                        </RltdPties>
                        <RltdAgts>
                            <DbtrAgt>
                                <FinInstnId>
                                    <BIC>ABNANL2A</BIC>
                                </FinInstnId>
                            </DbtrAgt>
                            <CdtrAgt>
                                <FinInstnId>
                                    <BIC>BUNQNL2A</BIC>
                                </FinInstnId>
                            </CdtrAgt>
                        </RltdAgts>
                        <RmtInf>
                            <Ustrd>b4k5f0vq 0140000832158636 NL51BUNQ2206371235 van Brink</Ustrd>
                        </RmtInf>
                    </TxDtls>
                </NtryDtls>
                <AddtlNtryInf>/TRTP/iDEAL/IBAN/NL78BUNQ2291284258/BIC/BUNQNL2A/NAME/Bunq B.V.  /REMI/b4k5f0vq 0140000832158636 NL51BUNQ2206371235 van Brink     /EREF/01-01-2024 12:16 0140000832158636</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="EUR">000000000000010.00</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>BOOK</Sts>
                <BookgDt>
                    <Dt>2024-01-02</Dt>
                </BookgDt>
                <ValDt>
                    <Dt>2024-01-01</Dt>
                </ValDt>
                <AcctSvcrRef>4001A2355529636S0PS</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>PMNT</Cd>
                        <Fmly>
                            <Cd>ICDT</Cd>
                            <SubFmlyCd>STDO</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>N411</Cd>
                        <Issr>ABNAMRO</Issr>
                    </Prtry>
                </BkTxCd>
                <NtryDtls>
                    <TxDtls>
                        <Refs>
                            <AcctSvcrRef>4001A2355529636S0PS</AcctSvcrRef>
                            <EndToEndId>NOTPROVIDED</EndToEndId>
                        </Refs>
                        <AmtDtls>
                            <TxAmt>
                                <Amt Ccy="EUR">000000000000010.00</Amt>
                            </TxAmt>
                        </AmtDtls>
                        <RltdPties>
                            <Cdtr>
                                <Nm>Stichting Bitvavo Paymen</Nm>
                            </Cdtr>
                            <CdtrAcct>
                                <Id>
                                    <IBAN>NL23BUNQ2291234129</IBAN>
                                </Id>
                            </CdtrAcct>
                        </RltdPties>
                        <RltdAgts>
                            <DbtrAgt>
                                <FinInstnId>
                                    <BIC>ABNANL2A</BIC>
                                </FinInstnId>
                            </DbtrAgt>
                            <CdtrAgt>
                                <FinInstnId>
                                    <BIC>BUNQNL2A</BIC>
                                </FinInstnId>
                            </CdtrAgt>
                        </RltdAgts>
                        <RmtInf>
                            <Ustrd>7D632F55C3</Ustrd>
                        </RmtInf>
                    </TxDtls>
                </NtryDtls>
                <AddtlNtryInf>/TRTP/SEPA OVERBOEKING/IBAN/NL23BUNQ2291234129/BIC/BUNQNL2A/NAME/Stichting Bitvavo Payments/REMI/7D632F55C3/EREF/NOTPROVIDED</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="EUR">000000000000006.61</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>BOOK</Sts>
                <BookgDt>
                    <Dt>2024-01-02</Dt>
                </BookgDt>
                <ValDt>
                    <Dt>2023-12-31</Dt>
                </ValDt>
                <AcctSvcrRef>1231143844781583</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>PMNT</Cd>
                        <Fmly>
                            <Cd>CCRD</Cd>
                            <SubFmlyCd>POSD</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>N426</Cd>
                        <Issr>ABNAMRO</Issr>
                    </Prtry>
                </BkTxCd>
                <AddtlNtryInf>BEA, Apple Pay                  Jumbo Breda Heksenwa,PAS397     NR:02YN27, 31.12.23/14:38       BREDA</AddtlNtryInf>
            </Ntry>
        </Stmt>
    </BkToCstmrStmt>
</Document>                                                                                                                                `;

// converting to DOM Tree
const parser = new DOMParser();
const srcDOM = parser.parseFromString(xmlstr, "application/xml");

// Converting DOM Tree To JSON.
console.log(xml2json(srcDOM).Document);
</script>

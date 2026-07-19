import { computed, Service, signal } from '@angular/core';
import { CalculatorType, InvestmentCalculationResults, InvestmentCalculatorModel, TimeUnit } from '../models/calculator.model';
import { form, min, pattern, required } from '@angular/forms/signals';

@Service()
export class FinanceCalculatorsService {

    calculatorTypeModel = signal<CalculatorType>(CalculatorType.Investment)
    calculatorTypeForm = form(this.calculatorTypeModel)

    investmentCalculatorModel = signal<InvestmentCalculatorModel>({
        startingAmount: 0,
        yearlyReturnRate: 7,
        contribution: 100,
        contributionFrequency: TimeUnit.Week,
        yearsInvested: 20
    })
    investmentCalculatorForm = form(this.investmentCalculatorModel, (schemaPath) => {
        min(schemaPath.startingAmount, 0, {message: 'Starting Amount cannot be negative'})
        min(schemaPath.yearlyReturnRate, 0, {message: 'Starting Amount cannot be negative'})
        min(schemaPath.contribution, 0, {message: 'Starting Amount cannot be negative'})
        min(schemaPath.yearsInvested, 1, {message: 'Starting Amount cannot be negative'})
    })

    investmentCalculationResult = computed<InvestmentCalculationResults>(() => {
        this.storeInvestmentCalculatorModel(this.investmentCalculatorModel())
        return this.investmentCalculation(this.investmentCalculatorModel())
    })

    constructor() {

        // initialize investmentCalculatorModel in localstorage
        if (localStorage.getItem('investment-calculator-model')) {
            const storedInvestmentCalculatorModel = JSON.parse(localStorage.getItem('investment-calculator-model')!)
            this.investmentCalculatorModel.set(storedInvestmentCalculatorModel)
        }
        else {
            console.log('asdf')
            this.storeInvestmentCalculatorModel(this.investmentCalculatorModel())
        }

    }

    private storeInvestmentCalculatorModel(investmentCalculatorModel: InvestmentCalculatorModel) {

        localStorage.setItem('investment-calculator-model', JSON.stringify(investmentCalculatorModel));
    }


    investmentCalculation(investmentCalculator: InvestmentCalculatorModel): InvestmentCalculationResults {
        const contributionFrequency = this.getNumbericTimeUnit(investmentCalculator.contributionFrequency);
        const totalContributions = contributionFrequency * investmentCalculator.yearsInvested
        const returnRate = (investmentCalculator.yearlyReturnRate / 100) / contributionFrequency
        let results: InvestmentCalculationResults = {
            startingBalance: investmentCalculator.startingAmount,
            endBalance: 0,
            totalContributions: investmentCalculator.contribution * totalContributions,
            totalInterestEarned: 0,
            stats: []
        }

        let currentBalance = investmentCalculator.startingAmount
        let contributionBalance = investmentCalculator.startingAmount

        for (let i: number = 1; i <= totalContributions; i++) {
            const startingBalance = currentBalance
            const interestEarned = startingBalance * returnRate

            currentBalance = startingBalance + interestEarned + investmentCalculator.contribution
            contributionBalance += investmentCalculator.contribution

            results.totalInterestEarned += interestEarned
            results.endBalance = currentBalance
            results.stats.push({
                interval: investmentCalculator.contributionFrequency,
                intervalNumber: i,
                startingBalance: startingBalance,
                contribution: investmentCalculator.contribution,
                interestEarned: interestEarned,
                endingBalance: currentBalance,
                contributionBalance: contributionBalance
            })
        }

        return results
    }

    getNumbericTimeUnit(timeUnit: TimeUnit): number {
        switch (timeUnit) {
            case TimeUnit.Week:
                return 52
            case TimeUnit.Month:
                return 12
            case TimeUnit.Year:
                return 1
        }
    }
}

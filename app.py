# Estrutura de dados: Dicionários para organizar tudo
receitas = {
    "Salário": 5000.00,
    "Renda Extra": 500.00
}

despesas = {
    "Aluguel": 1200.00,
    "Supermercado": 800.00,
    "Energia Elétrica": 250.00,
    "Água": 150.00,
    "Plano de Saúde": 400.00,
    "Boletos Diversos": 300.00,
    "Lazer": 200.00
}

# Cálculos Automáticos
total_receitas = sum(receitas.values())
total_despesas = sum(despesas.values())
balanco_final = total_receitas - total_despesas

# Exibição do Relatório
print("-" * 40)
print(f"{'ORÇAMENTO MENSAL DOMÉSTICO':^40}")
print("-" * 40)

print("\n--- RECEITAS ---")
for item, valor in receitas.items():
    print(f"{item:<20}: R$ {valor:>8.2f}")

print("\n--- DESPESAS ---")
for item, valor in despesas.items():
    print(f"{item:<20}: R$ {valor:>8.2f}")

print("-" * 40)
print(f"TOTAL RECEITAS : R$ {total_receitas:>8.2f}")
print(f"TOTAL DESPESAS : R$ {total_despesas:>8.2f}")

# Lógica de cor/alerta para o Balanço
if balanco_final > 0:
    status = "SOBROU DINHEIRO (POUPANÇA!)"
elif balanco_final < 0:
    status = "ORÇAMENTO NO VERMELHO!"
else:
    status = "CONTAS ZERADAS"

print(f"BALANÇO FINAL  : R$ {balanco_final:>8.2f}")
print(f"STATUS         : {status}")
print("-" * 40)
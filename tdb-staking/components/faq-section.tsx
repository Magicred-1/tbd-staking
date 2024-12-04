import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  
  const faqData = [
    {
      question: "What is XRP Restaking?",
      answer: "XRP Restaking is a process where XRP holders can stake their tokens across multiple blockchain networks, including Cosmos, Avalanche, and Polkadot. This allows for increased interoperability and potential rewards from various ecosystems."
    },
    {
      question: "How do I start staking?",
      answer: "To start staking, first connect your wallet, then select a finality provider from the list. Once selected, you can specify the amount you wish to stake and confirm the transaction."
    },
    {
      question: "What are the risks involved?",
      answer: "Staking involves locking up your tokens for a period of time. There may be risks such as potential slashing (loss of a portion of staked tokens) if the validator misbehaves. Always research the providers and understand the terms before staking."
    },
    {
      question: "What are the rewards for staking?",
      answer: "Rewards vary depending on the network and the specific provider you choose. Generally, you can earn a percentage of your staked amount as rewards. The exact APY (Annual Percentage Yield) is usually displayed by each provider."
    },
    {
      question: "Can I unstake my tokens at any time?",
      answer: "Unstaking policies vary by network. Some networks have a cooldown period after you request to unstake. During this period, your tokens are still locked and not earning rewards. Always check the specific unstaking rules for the network you're staking on."
    }
  ]
  
  export function FAQ() {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-gray-100">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-gray-200 hover:text-blue-400">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    )
  }
  
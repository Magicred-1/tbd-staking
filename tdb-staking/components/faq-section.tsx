import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  
  const faqData = [
    {
      question: "What is x-Stake?",
      answer: "x-Stake allows XRP holders to participate in staking on multiple blockchain networks, such as Cosmos, Avalanche, and Polkadot. While XRP itself operates on a Proof-of-Authority (PoA) model and is not directly staked, holders can lock their XRP to support and secure Proof-of-Stake (PoS) blockchains, unlocking rewards and enhancing interoperability across ecosystems."
    },
    {
      question: "How do I start staking?",
      answer: "To start staking, first connect your wallet, then select a validator provider from the list. Once selected, you can specify the amount you wish to stake and confirm the transaction."
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
  